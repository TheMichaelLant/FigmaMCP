// Copyright (c) 2026 KEV Sofware Inc.

#pragma warning disable IDE0130
namespace Microsoft.Extensions.Hosting;

using System.Net;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

using global::Azure.Identity;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

// Adds common Aspire services: service discovery, resilience, health checks, and OpenTelemetry.
// This project should be referenced by each service project in your solution.
// To learn more about using this project, see https://aka.ms/dotnet/aspire/service-defaults
public static class Extensions
{
    public static TBuilder AddServiceDefaults<TBuilder>(this TBuilder builder) where TBuilder : IHostApplicationBuilder
    {
        builder.AddLogging();

        builder.AddJsonOptions();

        builder.AddHttpOptions();

        builder.AddConfiguration();

        builder.AddStorageServices();

        builder.AddCaching();

        builder.AddAIServices();

        builder.AddDefaultHealthChecks();

        if (builder is WebApplicationBuilder webApplicationBuilder)
        {
            webApplicationBuilder.AddWebServices();
        }

        return builder;
    }

    /// <summary>
    /// Adds the necessary JsonSerializerOptions to the <see cref="IHostApplicationBuilder"/>.
    /// </summary>
    /// <param name="builder">The <see cref="IHostApplicationBuilder"/> to configure.</param>
    public static void AddJsonOptions(this IHostApplicationBuilder builder)
    {
        builder.Services.Configure<JsonSerializerOptions>((options) =>
        {
            options.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault;
            options.PreferredObjectCreationHandling = JsonObjectCreationHandling.Populate;

            options.PropertyNameCaseInsensitive = true;
            options.WriteIndented = builder.Environment.IsDevelopment();
        });
    }

    /// <summary>
    /// Adds the necessary HttpClient Defaults to the <see cref="IHostApplicationBuilder"/>.
    /// </summary>
    /// <param name="builder">The <see cref="IHostApplicationBuilder"/> to configure.</param>
    public static void AddHttpOptions(this IHostApplicationBuilder builder)
    {
        builder.Services.ConfigureHttpClientDefaults(http =>
        {
            // Enable HTTP Compression
            http.ConfigurePrimaryHttpMessageHandler(handler => new HttpClientHandler()
            {
                AutomaticDecompression = DecompressionMethods.All,
            });

            // Enable Service Discovery
            http.AddServiceDiscovery();

            // Enable transient fault handling and retry
            http.AddStandardResilienceHandler();

            // Set a default User Agent Header
            http.ConfigureHttpClient(client =>
            {
                // ToDo: Improve User Agent header version selection to avoid use of System.Reflection
                var assembly = Assembly.GetEntryAssembly()?.GetName() ?? Assembly.GetExecutingAssembly()?.GetName();
                client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue(builder.Environment.ApplicationName, assembly?.Version?.ToString() ?? "Unknown"));
            });
        });
    }

    public static void AddConfiguration(this IHostApplicationBuilder builder)
    {
        // Add Azure App Configuration if configured
        var appConfigConnectionString = builder.Configuration.GetConnectionString("App-Config");
        var useAppConfig = !string.IsNullOrWhiteSpace(appConfigConnectionString);

        if (useAppConfig)
        {
            builder.AddAzureAppConfiguration(
                "App-Config",
                configureOptions: options =>
                {
                    // ToDo: Optimize DefaultAzureCredential Usage
                    options.UseFeatureFlags();
                    options.ConfigureKeyVault(options => options.SetCredential(new DefaultAzureCredential()));
                });
        }
    }

    public static TBuilder AddStorageServices<TBuilder>(this TBuilder builder)
        where TBuilder : IHostApplicationBuilder
    {
        // Add Azure Blob Storage Client if configured
        var blobConnectionString = builder.Configuration.GetConnectionString("Blob-Store");
        var useBlobStore = !string.IsNullOrWhiteSpace(blobConnectionString);

        if (useBlobStore)
        {
            builder.AddAzureBlobServiceClient(connectionName: "Blob-Store");
        }

        return builder;
    }

    public static void AddCaching(this IHostApplicationBuilder builder)
    {
        // In-Memory Cache for local caching needs
        builder.Services.AddMemoryCache();

        // ToDo: Real projects would use Redis or similar distributed cache
        builder.Services.AddDistributedMemoryCache();
    }

    public static TBuilder AddDefaultHealthChecks<TBuilder>(this TBuilder builder) where TBuilder : IHostApplicationBuilder
    {
        builder.Services.AddHealthChecks()
            // Add a default liveness check to ensure app is responsive
            .AddCheck("self", () => HealthCheckResult.Healthy(), ["live"]);

        return builder;
    }
}
