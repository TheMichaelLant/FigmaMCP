// Copyright (c) 2026 KEV Sofware Inc.

namespace KEV.Hackathon;

internal static class AppHost
{
    private static async Task Main(string[] args)
    {
        var builder = DistributedApplication.CreateBuilder(args);

        // Add a SQL Server with Docker Container Emulator for Local Dev
        var sqlServer = builder
            .AddSqlServer("SQL-Server")
            .WithLifetime(ContainerLifetime.Persistent)
            .WithDataVolume();

        // Add a SQL Database to the SQL Server
        var sqlDatabase = sqlServer
            .AddDatabase("DemoDB");

        // Add an Azure Storage Account with Docker Container Emulator for Local Dev
        var storageAccount = builder.AddAzureStorage("Storage-Account")
            .RunAsEmulator(emulator =>
            {
                emulator.WithDataVolume();
                emulator.WithLifetime(ContainerLifetime.Persistent);
            });

        var storageBlob = storageAccount
            .AddBlobs("Blob-Store");

        // Add Azure App Configuration with Docker Container Emulator for Local Dev
        var appConfig = builder
            .AddAzureAppConfiguration("App-Config")
            .RunAsEmulator(emulator =>
            {
                emulator.WithDataVolume();
                emulator.WithLifetime(ContainerLifetime.Persistent);
            });

        // Add our Demo API service with refrences to other infrastructure
        var apiBackend = builder.AddProject<Projects.KEV_Hackathon_AspireDemo_Services_DemoAPI>("AspireDemo-API")
            .WithReference(sqlDatabase)
            .WithReference(storageBlob)
            .WithReference(appConfig)

            // Default the Aspire Dashboard experience to open the OpenAPI docs
            .WithUrls(context =>
            {
                foreach (var url in context.Urls)
                {
                    url.Url += "/scalar";
                }
            });

        // Add our React Vite Application
        builder.AddViteApp("AspireDemo-React", "../KEV.Hackathon.AspireDemo.Web.React")
            .WithEnvironment("BROWSER", "none") // Disable opening browser on npm start
            .WithHttpsDeveloperCertificate()
            .WithHttpsEndpoint(env: "PORT", port: 45173, targetPort: 5173)
            .WithExternalHttpEndpoints()
            .WithReference(apiBackend);

        await builder.Build().RunAsync();
    }
}