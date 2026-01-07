// Copyright (c) 2026 KEV Sofware Inc.

#pragma warning disable IDE0130
namespace Microsoft.Extensions.Hosting;

using global::Azure.Monitor.OpenTelemetry.AspNetCore;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using OpenTelemetry;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;

public static class LoggingExtensions
{
    public static TBuilder AddLogging<TBuilder>(this TBuilder builder)
        where TBuilder : IHostApplicationBuilder
    {
        builder.Logging.AddSimpleConsole(options =>
        {
            options.SingleLine = true;
            options.IncludeScopes = false;
            options.TimestampFormat = "HH:mm:ss ";
        });

        builder.Logging.AddOpenTelemetry(logging =>
        {
            logging.IncludeFormattedMessage = true;
            logging.IncludeScopes = true;
        });

        builder.Services.AddOpenTelemetry()
            .WithMetrics(metrics =>
            {
                metrics
                    .AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddRuntimeInstrumentation();
            })

            .WithTracing(tracing =>
            {
                tracing
                    .AddSource(builder.Environment.ApplicationName)

                    .AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation();
            });

        builder.AddOpenTelemetryExporters();
        return builder;
    }

    public static TBuilder AddOpenTelemetryExporters<TBuilder>(this TBuilder builder)
        where TBuilder : IHostApplicationBuilder
    {
        var oltpConnectionString = builder.Configuration["OTEL_EXPORTER_OTLP_ENDPOINT"];
        var useOtlpExporter = !string.IsNullOrWhiteSpace(oltpConnectionString);
        if (useOtlpExporter)
        {
            builder.Services
                .AddOpenTelemetry()
                .UseOtlpExporter();
        }

        var appInsightsConnectionString = builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"];
        var useAzMonExporter = !string.IsNullOrWhiteSpace(appInsightsConnectionString);
        if (useAzMonExporter)
        {
            builder.Services
                .AddOpenTelemetry()
                .UseAzureMonitor();
        }

        return builder;
    }
}