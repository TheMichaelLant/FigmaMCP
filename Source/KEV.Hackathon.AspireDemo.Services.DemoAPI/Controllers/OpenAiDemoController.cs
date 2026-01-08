// Copyright (c) 2026 KEV Sofware Inc.

namespace KEV.Hackathon.Controllers;

using System;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using OpenAI;

[Authorize]
[ApiController]
[Route("[controller]")]
public class OpenAiDemoController(OpenAIClient openAIClient) : ControllerBase
{
    [HttpGet(Name = "GetAiResponse")]
    public async Task<IActionResult> Get([FromQuery] string prompt)
    {
        if (string.IsNullOrWhiteSpace(prompt))
        {
            return this.BadRequest("Prompt cannot be empty.");
        }

        try
        {
            // Available models:
            //   gpt-5.1-chat
            //   gpt-5.1-codex-mini
            //   dall-e-3

            // See Also
            // https://learn.microsoft.com/en-us/dotnet/api/overview/azure/ai.openai-readme?view=azure-dotnet

            var chatClient = openAIClient.GetChatClient("gpt-5.1-chat");
            var response = await chatClient.CompleteChatAsync(prompt);

            return this.Ok(new { Response = response.Value.Content[0].Text });
        }
        catch (Exception ex)
        {
            return this.StatusCode(500, new { Error = ex.Message });
        }
    }
}