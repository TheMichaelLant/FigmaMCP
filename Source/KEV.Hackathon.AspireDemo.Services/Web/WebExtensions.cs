// Copyright (c) 2026 KEV Sofware Inc.

#pragma warning disable IDE0130
namespace Microsoft.Extensions.Hosting;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

using Scalar.AspNetCore;

public static class WebExtensions
{
    private const string HealthEndpointPath = "/health";
    private const string AlivenessEndpointPath = "/alive";

    public static WebApplicationBuilder AddWebServices(this WebApplicationBuilder builder)
    {
        // Required for HTTPS and HTTP/3 (QUIC)
        builder.WebHost.UseQuic();
        builder.WebHost.UseKestrel();

        // Allow CORS for specified origins
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .WithOrigins("https://*.dev.localhost:7065")
                        .WithOrigins("https://*.dev.localhost:5173")
                        .WithOrigins("https://*.dev.localhost:45173")
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .AllowAnyHeader();
                });
        });

        // Add Authentication and Authorization using Entra ID
        var tenantId = builder.Configuration["AzureAd:TenantId"];
        var clientId = builder.Configuration["AzureAd:ClientId"];

        builder.Services.AddAuthorization();
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                // Entra ID's well-known metadata endpoint - automatically retrieves signing keys
                options.Authority = $"https://login.microsoftonline.com/{tenantId}/v2.0";
                options.Audience = clientId;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudiences = [$"api://{clientId}"],
                    ValidIssuers = [$"https://sts.windows.net/{tenantId}/", $"https://login.microsoftonline.com/{tenantId}/v2.0"]
                };
            });

        // Add controllers for API endpoints
        builder.Services.AddControllers();

        // See here for OAuth flow example
        // https://duendesoftware.com/blog/20251126-securing-openapi-and-swagger-ui-with-oauth-in-dotnet-10

        builder.Services.AddOpenApi(options =>
        {
            // Specify the OpenAPI version to use
            options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_0;

            options.AddDocumentTransformer((document, context, cancellationToken) =>
            {
                var tenantId = builder.Configuration["AzureAd:TenantId"];

                // Ensure instances exist
                document.Components ??= new OpenApiComponents();
                document.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();

                document.Components.SecuritySchemes.Add("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        AuthorizationCode = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri($"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize"),
                            TokenUrl = new Uri($"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token"),
                            Scopes = new Dictionary<string, string>
                            {
                                { "openid", "Access the OpenID Connect user profile" },
                                { "email", "Access the user's email address" },
                                { "profile", "Access the user's profile" }
                            }
                        }
                    }
                });

                document.Security = [
                    new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecuritySchemeReference("oauth2"),
                            ["api", "profile", "email", "openid"]
                        }
                    }
                ];

                // Set the host document for all elements
                // including the security scheme references
                document.SetReferenceHostDocument();

                return Task.CompletedTask;
            });
        });

        return builder;
    }

    public static WebApplication MapDefaultEndpoints(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference(options =>
            {
                var tenantId = app.Configuration["AzureAd:TenantId"];
                var clientId = app.Configuration["AzureAd:ClientId"];

                options
                    .EnablePersistentAuthentication()

                    .AddAuthorizationCodeFlow("oauth2", flow =>
                    {
                        // No client secret needed - uses PKCE for secure authorization code flow
                        flow.AuthorizationUrl = $"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize";
                        flow.TokenUrl = $"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token";
                        flow.ClientId = clientId;
                        flow.Pkce = Pkce.Sha256;
                        flow.SelectedScopes = ["openid", "email", "profile"];
                    })

                    .AddPreferredSecuritySchemes("oauth2");
            });
        }

        app.UseCors();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        // Adding health checks endpoints to applications in non-development environments has security implications.
        // See https://aka.ms/dotnet/aspire/healthchecks for details before enabling these endpoints in non-development environments.
        if (app.Environment.IsDevelopment())
        {
            // All health checks must pass for app to be considered ready to accept traffic after starting
            app.MapHealthChecks(HealthEndpointPath);

            // Only health checks tagged with the "live" tag must pass for app to be considered alive
            app.MapHealthChecks(AlivenessEndpointPath, new HealthCheckOptions
            {
                Predicate = r => r.Tags.Contains("live"),
            });
        }

        return app;
    }
}