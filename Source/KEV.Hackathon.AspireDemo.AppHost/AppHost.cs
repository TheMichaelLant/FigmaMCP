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

        // Add Existing Azure OpenAI Service
        var existingOpenAIName = builder.AddParameter("OpenAI-Resource-Name", "eng-gen-hackathon-cac-oai", false, true);
        var existingOpenAIResourceGroup = builder.AddParameter("OpenAI-Resource-Group", "eng-gen-hackathon-cac-rg", false, true);

        var openAI = builder
            .AddAzureOpenAI("OpenAI")
            .AsExisting(existingOpenAIName, existingOpenAIResourceGroup)
            .ConfigureInfrastructure(infra =>
            {
                // Aspire tries to create role assignments in Azure for the current user.
                // RBAC is already assigned by Entra ID Groups, so remove this Aspire config

                var roleAssignments = infra.GetProvisionableResources()
                    .OfType<Azure.Provisioning.Authorization.RoleAssignment>()
                    .ToList();

                foreach (var roleAssignment in roleAssignments)
                {
                    infra.Remove(roleAssignment);
                }
            });

        // Add our React JavaScript Application
        builder.AddViteApp("AspireDemo-React", "../KEV.Hackathon.AspireDemo.Web.React")
            .WithEnvironment("BROWSER", "none") // Disable opening browser on npm start
            .WithHttpsDeveloperCertificate()
            .WithHttpsEndpoint(env: "PORT", port: 45173, targetPort: 5173)
            .WithExternalHttpEndpoints();

        // Add our Demo API service with refrences to other infrastructure
        builder.AddProject<Projects.KEV_Hackathon_AspireDemo_Services_DemoAPI>("AspireDemo-API")
            .WithReference(sqlDatabase)
            .WithReference(storageBlob)
            .WithReference(appConfig)
            .WithReference(openAI)

            // Default the Aspire Dashboard experience to open the OpenAPI docs
            .WithUrls(context =>
            {
                foreach (var url in context.Urls)
                {
                    url.Url += "/scalar";
                }
            });

        await builder.Build().RunAsync();
    }
}