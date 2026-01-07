// Copyright (c) 2026 KEV Sofware Inc.

#pragma warning disable IDE0130
namespace Microsoft.Extensions.Hosting;

using Microsoft.Extensions.Configuration;

public static class AIExtensions
{
    public static TBuilder AddAIServices<TBuilder>(this TBuilder builder)
    where TBuilder : IHostApplicationBuilder
    {
        var aiConnectionString = builder.Configuration.GetConnectionString("OpenAI");
        ArgumentNullException.ThrowIfNullOrWhiteSpace(aiConnectionString, "Connection string 'OpenAI' not found.");

        builder
            .AddAzureOpenAIClient(connectionName: "OpenAI")
            .AddChatClient();

        return builder;
    }
}
