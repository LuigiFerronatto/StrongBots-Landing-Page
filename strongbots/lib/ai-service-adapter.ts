/**
 * AI Service Adapter - Simplificado para fazer fetch direto para a API da OpenAI
 */
export class AIServiceAdapter {
  private endpoint: string
  private apiKey: string
  private model: string
  private apiVersion: string
  private systemPrompt: string
  private temperature: number
  private maxTokens: number
  private frequencyPenalty: number
  private presencePenalty: number
  private topP: number

  constructor(config: {
    apiKey?: string
    model?: string
    systemPrompt?: string
    temperature?: number
    maxTokens?: number
    frequencyPenalty?: number
    presencePenalty?: number
    topP?: number
    endpoint?: string
    apiVersion?: string
  }) {
    // Use environment variables as fallbacks
    this.endpoint = config.endpoint || process.env.OPENAI_ENDPOINT || ""
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY || ""
    this.apiVersion = config.apiVersion || process.env.OPENAI_API_VERSION || "2023-03-15-preview"
    this.model = config.model || process.env.OPENAI_MODEL || "gpt-4-0613"
    this.systemPrompt = config.systemPrompt || ""
    this.temperature = config.temperature || 0.8
    this.maxTokens = config.maxTokens || 1000
    this.frequencyPenalty = config.frequencyPenalty || 2
    this.presencePenalty = config.presencePenalty || 0
    this.topP = config.topP || 1

    // Validate required configuration
    if (!this.endpoint || !this.apiKey) {
      console.warn("Missing OpenAI configuration. AI features may not work correctly.")
    }
  }

  /**
   * Send a message to the AI service using direct fetch
   * @param messages - Array of message objects with role and content
   * @returns Response from the API
   */
  async sendMessage(messages: Array<{ role: string; content: string }>) {
    try {
      // Add system message if it's not already there and we have a system prompt
      const messagesWithSystem =
        this.systemPrompt && messages[0]?.role !== "system"
          ? [{ role: "system", content: this.systemPrompt }, ...messages]
          : messages

      // Construct the API URL with query parameters
      const apiUrl = `${this.endpoint}?api-version=${this.apiVersion}`

      // Make the fetch request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": this.apiKey,
        },
        body: JSON.stringify({
          model: this.model,
          messages: messagesWithSystem,
          temperature: this.temperature,
          max_tokens: this.maxTokens,
          top_p: this.topP,
          frequency_penalty: this.frequencyPenalty,
          presence_penalty: this.presencePenalty,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending message to AI service:", error)
      throw error
    }
  }

  /**
   * Process AI response to extract the message content
   * @param response - API response object
   * @returns Extracted message content
   */
  processResponse(response: any) {
    try {
      if (
        response &&
        response.choices &&
        response.choices.length > 0 &&
        response.choices[0].message &&
        response.choices[0].message.content
      ) {
        return response.choices[0].message.content
      }

      throw new Error("Invalid API response format")
    } catch (error) {
      console.error("Error processing API response:", error)
      return "Sorry, I encountered an error."
    }
  }
}

