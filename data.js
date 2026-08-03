// Auto-generated CCAF question bank.
// Source: 149 practice questions compiled from publicly available sources (primarily CertiQ).
// Categories were inferred from recurring content themes in the dump, not an official Anthropic syllabus.
// To add/edit questions, see README.md.

var CCAF_CATEGORIES = [
  {
    "id": "tools",
    "name": "Tool Use & Escalation",
    "description": "Designing tool schemas, handling errors and retries, and building safe human-escalation paths for agentic tool calls.",
    "color": "#FF6A2B",
    "icon": "wrench",
    "order": 1,
    "questions": [
      {
        "id": "tools-16",
        "question": "Your search products tool queries an external catalog API that returns paginated results (50 items per request). Production logs show queries frequently match 200+ products, and the design that auto-fetches all pages causes 15-20 second delays. How should you redesign the pagination handling?",
        "choices": [
          "Create separate search products and fetch more results tools for pagination.",
          "Implement server-side relevance ranking and return only the top 50 most relevant items.",
          "Add a max pages parameter (default: 2) that controls how many pages are fetched internally.",
          "Return the first page with total match count and cursor for additional pages."
        ],
        "correctIndex": 3,
        "explanation": "This enables lazy loading and explicit control, allowing the agent to fetch more results only when needed— balancing performance and completeness.",
        "choiceExplanations": [
          "This exposes pagination mechanics to the agent, increasing complexity and coupling tool usage with control flow.",
          "While this reduces latency, it removes access to the full result set, limiting flexibility when more results are actually needed.",
          "This is an improvement over fetching everything, but it still hides pagination control inside the tool and may fetch unnecessary data.",
          "This enables lazy loading and explicit control, allowing the agent to fetch more results only when needed— balancing performance and completeness."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-17",
        "question": "Your search Flights tool calls an external airline API that occasionally returns a 503 Service Unavailable error. What is the most effective way to handle this error in your tool implementation?",
        "choices": [
          "Return an empty flight list as if the search succeeded but found no matching flights.",
          "Log the error internally and return an empty response, letting the model continue without the flight data.",
          "Return an error message in the tool result explaining the service is temporarily unavailable.",
          "Automatically retry the request up to five times with exponential backoff before returning results to the agent."
        ],
        "correctIndex": 3,
        "explanation": "This is the most effective approach—handles transient failures gracefully, improves reliability, and only surfaces errors if retries fail.",
        "choiceExplanations": [
          "This hides the failure and misleads the system into thinking no flights exist, which can lead to incorrect conclusions.",
          "This still suppresses the failure signal, preventing the agent from taking corrective action.",
          "While transparent, this alone doesn’t attempt recovery and may degrade user experience unnecessarily.",
          "This is the most effective approach—handles transient failures gracefully, improves reliability, and only surfaces errors if retries fail."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-18",
        "question": "Your MCP server implements a check_availability tool that queries an external calendar API. During testing, you encounter three error conditions: (1) the tool is called with a malformed request, missing the required user_email parameter (2) the calendar API returns a 404 because the specified user doesn't exist in the calendar system (3) the calendar API returns a 503 because the service is temporarily unavailable. How should each error be reported according to MCP's error handling design?",
        "choices": [
          "Report all three as tool results with isError: true",
          "Report errors 1 and 2 as JSON-RPC protocol errors, report error 3 as a tool result with isError: true",
          "Report error 1 as a JSON-RPC protocol error, report errors 2 and 3 as tool results with isError: true",
          "Report all three as JSON-RPC protocol errors."
        ],
        "correctIndex": 2,
        "explanation": "Error 1 (malformed request) → JSON-RPC protocol error (invalid input) Error 2 (user not found) → Tool result with isError: true (valid execution, meaningful failure) Error 3 (service unavailable) → Tool result with isError: true (transient external failure)",
        "choiceExplanations": [
          "Malformed requests (error 1) are protocol-level issues, not tool execution results, so they should not be reported this way.",
          "A 404 (error 2) is a valid tool execution outcome (the user doesn’t exist), not a protocol error.",
          "Error 1 (malformed request) → JSON-RPC protocol error (invalid input) Error 2 (user not found) → Tool result with isError: true (valid execution, meaningful failure) Error 3 (service unavailable) → Tool result with isError: true (transient external failure)",
          "Only malformed requests should be protocol errors; external API responses are tool-level outcomes, not protocol failures."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-19",
        "question": "Your documents (query) tool returns results as \"Found 3 documents: Q2 Budget Proposal, Q2 Budget Forecast, Annual Review\". You want the agent to document (4, multi) and doc (24, multi). What return format would best enable these multi-step workflows?",
        "choices": [
          "URLs that users can click to open the document in their browser.",
          "Structured data containing document IDs and metadata for each result.",
          "A JSON array of document titles extracted from the search results.",
          "More detailed human-readable descriptions including the size and authors."
        ],
        "correctIndex": 1,
        "explanation": "This enables the agent to programmatically reference specific documents (via IDs) across multiple steps, making workflows like follow-up queries or document retrieval precise and reliable.",
        "choiceExplanations": [
          "URLs are useful for users, but not ideal for agents performing multi-step workflows that require reliable referencing and further operations.",
          "This enables the agent to programmatically reference specific documents (via IDs) across multiple steps, making workflows like follow-up queries or document retrieval precise and reliable.",
          "Titles alone are ambiguous and not stable identifiers, making it difficult for agents to reliably act on specific documents.",
          "Helpful for users, but still unstructured and not suitable for precise multi-step agent operations."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-20",
        "question": "Your agent has access to 50+ specialized API connectors for different external services. As the connector library grew, tool selection accuracy dropped to 58%. You design a search_connectors(description) tool that finds matching connectors, but in testing agents frequently skip searching and call connectors directly (often incorrectly), or search select wrong connectors from the filtered results. How should you design the tool composition pattern to address both issues?",
        "choices": [
          "Design connectors with built-in compatibility validation that return descriptive errors for mismatched requests.",
          "Design a find_and_execute(description, params) composite tool that searches and immediately executes the best matching connector.",
          "Enhance all connector descriptions with detailed usage samples, edge cases, and input requirements. Add few-shot examples showing the correct search-then-use workflow.",
          "Design search_connectors to dynamically add matched connectors to the agent's available tools. Connectors start unavailable and persist once discovered."
        ],
        "correctIndex": 3,
        "explanation": "This enforces the search-first pattern by limiting available tools initially and reducing the decision space, improving both discovery and correct selection.",
        "choiceExplanations": [
          "This helps with error handling after a wrong choice is made, but does not improve initial tool selection accuracy.",
          "This removes transparency and control, making debugging harder and preventing the agent from reasoning about tool choice.",
          "While helpful, this still relies on the agent to follow instructions and does not enforce correct behavior, especially at scale with 50+ tools.",
          "This enforces the search-first pattern by limiting available tools initially and reducing the decision space, improving both discovery and correct selection."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-21",
        "question": "Your publish article tool calls an external CMS API that occasionally returns transient errors (network timeouts, 503s) and non-transient errors (403 permission denied, 422 validation failure). Currently, every error is returned directly to the agent, which leads to the agent retrying non-transient errors and wasting turns on failures that will never succeed. How should you partition error-handling responsibility between the tool implementation and the agent?",
        "choices": [
          "Handle all errors inside the tool: Implement retries with exponential backoff for every error type, and only surface a failure to the agent after a fixed number of retry attempts have been exhausted.",
          "Handle transient errors (timeouts, 503s) with automatic retries inside the tool implementation, and surface non-transient errors (permission denied, validation fallures) to the agent with descriptive messages so it can take corrective action.",
          "Surface all errors to the agent immediately with detailed context, and let the agent decide which errors to retry and how many times-keeping the tool implementation stateless and simple.",
          "Implement a universal error handler that catches all exceptions and returns a generic \"tool unavailable-try again later\" message, shielding the agent from error complexity."
        ],
        "correctIndex": 1,
        "explanation": "This cleanly separates responsibility: Tool handles recoverable/transient issues automatically Agent receives actionable errors it can fix (permissions, input validation)",
        "choiceExplanations": [
          "This wastes time retrying non-transient errors (e.g., 403, 422) that will never succeed and hides useful feedback from the agent.",
          "This cleanly separates responsibility: Tool handles recoverable/transient issues automatically Agent receives actionable errors it can fix (permissions, input validation)",
          "This pushes retry logic to the agent, leading to inefficient behavior and wasted turns.",
          "This removes critical detail, preventing the agent from taking corrective actions when possible."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-22",
        "question": "Your remove_team_member tool uses a dry_run: boolean parameter for previewing impacts before execution. Production monitoring shows the agent bypasses the preview step in 15% of calls by calling with dry_run=false directly. You need to ensure every removal is preceded by a preview that the user explicitly confirms. What is the most reliable approach?",
        "choices": [
          "Add server-side validation that permits dry_run=false only when a dry_run=true call with identical parameters occurred within the past 60 seconds.",
          "Replace with two tools: preview_remove_member returns impact details and a single-use confirmation token; execute_remove_member requires that token, binding execution to the specific previewed action.",
          "Annotate the tool as requiring confirmation and configure the orchestration layer to prompt the user for approval before forwarding any calls to annotated tools.",
          "Add detailed instructions and few-shot examples to the tool description requiring the agent to always call with dry_run=true first and wait for user confirmation before calling with dry_run=false."
        ],
        "correctIndex": 1,
        "explanation": "This enforces the correct workflow at the system level by requiring a valid preview step and tying execution to an explicit confirmation, making bypass impossible.",
        "choiceExplanations": [
          "This approach is brittle because it depends on timing and does not guarantee that the user actually reviewed or confirmed the preview.",
          "This enforces the correct workflow at the system level by requiring a valid preview step and tying execution to an explicit confirmation, making bypass impossible.",
          "This depends on orchestration behavior and is not strictly enforced, so it can still be bypassed or misconfigured.",
          "Instruction-based approaches are not reliable for enforcement, as demonstrated by the existing bypass rate."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-23",
        "question": "Your expense reimbursement agent processes employee requests using a process reimbursement tool. Company policy requires that reimbursements above $500 must be approved before funds are disbursed. The agent handles hundreds of requests daily, and you need the threshold enforcement to be tamper-proof regardless of how the agent is prompted ensures the $500 approval threshold cannot be bypassed?",
        "choices": [
          "The process reimbursement tool accepts an approved by manager parameter. The system prompt instructs the agent to only set this to true after confirming that a manager approved the request. A nightly audit script reviews all reimbursements where approved by manager was set to true.",
          "Provide two tools: auto reimburse (hard-coded limit of $500) and manager approval. Include detailed system prompt instructions telling the agent to check the amount and use the appropriate tool. Add a Post ToolUse hook that logs which tool was called for auditing.",
          "The process reimbursement tool accepts amount and details, and internally enforces the threshold; amounts <$500 are auto-disbursed and the tool returns a success confirmation. Amounts >$500 cause the tool to create a pending approval request and return a status indicating manager review is pending.",
          "Implement the threshold check in a PreToolUse hook that inspects the amount parameter before process reimbursement executes. If the amount exceeds $500, the hook modifies the context to add a requires approval: true flag, which the tool checks before disbursing."
        ],
        "correctIndex": 2,
        "explanation": "This enforces the rule inside the tool itself, making it impossible to bypass regardless of how the agent is prompted.",
        "choiceExplanations": [
          "This relies on the agent following instructions and post-hoc auditing, which is not tamper-proof and allows bypass at execution time.",
          "Again depends on agent behavior and correct tool selection. Logging helps auditing but does not prevent misuse.",
          "This enforces the rule inside the tool itself, making it impossible to bypass regardless of how the agent is prompted.",
          "PreToolUse hooks can be bypassed or misconfigured and still rely on downstream logic. Enforcement should reside directly within the tool for full reliability."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-24",
        "question": "Your order management system requires tools for three distinct operations: issuing refunds (requires amount and reason), canceling orders (requires reason), and res (requires shipping address). Each operation shares an order id parameter but has different additional requirements. You notice during testing that with your current frequently omits required parameters or includes irrelevant ones. What design change will most effectively improve parameter accuracy?",
        "choices": [
          "Split into three separate tools (each defining only the parameters required for that specific operation.",
          "Keep one unified tool with all parameters marked optional, but add few-shot examples in the system prompt showing correct parameter combinations for each operation.",
          "Keep one unified tool but add JSON Schema if-then-else conditionals to enforce that parameters like amount are required only when the operation type is \"refund\".",
          "Keep one unified tool with a nested operation object parameter whose internal structure varies by operation type, documented in the tool description."
        ],
        "correctIndex": 0,
        "explanation": "Split into three separate tools (e.g., issue_refund, cancel_order, reship_order), each defining only the parameters required for that specific operation. This reduces ambiguity and ensures the agent only sees relevant parameters per operation, leading to much higher accuracy.",
        "choiceExplanations": [
          "Split into three separate tools (e.g., issue_refund, cancel_order, reship_order), each defining only the parameters required for that specific operation. This reduces ambiguity and ensures the agent only sees relevant parameters per operation, leading to much higher accuracy.",
          "Examples help, but the schema remains ambiguous, so errors will still occur.",
          "While technically valid, this increases complexity and is less reliable than simply separating tools.",
          "This adds complexity and cognitive load, making it harder for the agent to consistently provide correct parameters."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-25",
        "question": "Your portfolio value tool returns the total value of a user's investment portfolio. You're deciding between returning a structured JSON object with explicit fields versus returning information as a formatted text string. What is the primary advantage of using structured output with defined fields?",
        "choices": [
          "Structured JSON consumes significantly fewer tokens than natural language, substantially reducing API costs.",
          "The agent can reliably extract specific values without parsing free form text, reducing errors in subsequent operations.",
          "Structured JSON is processed deterministically by the model, significantly improving accuracy when extracting values.",
          "JSON schemas automatically validate that the underlying API returned correct data before the agent processes it."
        ],
        "correctIndex": 1,
        "explanation": "Structured output provides clear, predictable fields, making it easy for the agent to use the data accurately in downstream steps.",
        "choiceExplanations": [
          "Token usage depends on the content; JSON is not inherently more compact than text and may sometimes use more tokens.",
          "Structured output provides clear, predictable fields, making it easy for the agent to use the data accurately in downstream steps.",
          "The model is still probabilistic; JSON improves structure, but not deterministic processing.",
          "Schemas define structure, but they do not guarantee correctness of the actual data returned by the API."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-26",
        "question": "Your scheduling agent uses get_available_slots(date, provider_id) to retrieve open appointment times, then book_appointment(provider_id, slot_time, patient_id) to reserve a slot. tickets show that 15% of booking attempts fall with \"slot no longer available\" because another user booked the slot between the availability check and the booking call. How should you r these tools?",
        "choices": [
          "Modify book_appointment to return detailed failure information including currently available alternative slots when the requested slot is unavailable, enabling the agent to retry with a di time.",
          "Keep both tools but add retry logic to the agent's system prompt, instructing it to call get_available_slots again and select a different time if booking fails.",
          "Add a hold_slot(provider_id, slot_time) tool that creates a 60 second temporary reservation, requiring the agent to call it between checking availability and booking.",
          "Combine both tools into a single find_and_book_appointment that atomically checks availability and books, returning either the confirmed booking or available alternatives."
        ],
        "correctIndex": 3,
        "explanation": "This eliminates the race condition by making the operation atomic, ensuring consistency and reliability.",
        "choiceExplanations": [
          "This improves recovery but does not fix the race condition between availability check and booking.",
          "This still suffers from the same race condition and relies on agent behavior rather than fixing the underlying issue.",
          "This reduces the issue but introduces additional complexity and still requires multiple steps that can fail.",
          "This eliminates the race condition by making the operation atomic, ensuring consistency and reliability."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-27",
        "question": "Your agent has a log_workout tool that accepts exercise_type (string), value (number), and measurement (string). Production monitoring shows the agent frequently passes mismatched combinations-using measurement: \"reps\" for cardio exercises like running, or measurement: \"miles\" for strength exercises like bench press. Your exercises naturally divide into two categories: cardio (measured in time or distance) and strength (measured in reps and sets). 23% of tool calls have invalid combinations. What approach would most effectively reduce these errors?",
        "choices": [
          "Implement server-side validation returning descriptive errors for invalid combinations, allowing the agent to retry with corrections.",
          "Add enum constraints on measurement limiting values to \"minutes\", \"miles\", \"reps\", or \"sets\" to prevent arbitrary measurement strings.",
          "Add explicit examples to the tool description showing valid combinations (e.g., \"For running: use minutes or miles. For push-ups: use reps\") with constraints for each exercise category.",
          "Split into log_cardio_workout (with duration_minutes or distance_miles parameters) and log_strength_workout (with reps and sets parameters)."
        ],
        "correctIndex": 3,
        "explanation": "This enforces correctness at the schema level by eliminating invalid parameter combinations entirely, significantly reducing errors.",
        "choiceExplanations": [
          "This catches errors after they occur but does not prevent them, leading to wasted turns and inefficiency.",
          "This restricts values but does not prevent invalid combinations (e.g., still allows \"miles\" for bench press).",
          "Helpful guidance, but not enforceable—agents can still make mistakes.",
          "This enforces correctness at the schema level by eliminating invalid parameter combinations entirely, significantly reducing errors."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-28",
        "question": "Your MCP server includes archive_file(file_id) and delete_file(file_id) tools. Production logs show the agent calls delete_file when users ask to \"remove old backups,\" policy requires archiving backup files. Both tools currently have minimal descriptions: \"Archives a file\" and \"Deletes a file.\" Which change most directly improves tool selection?",
        "choices": [
          "Add a confirmation step that requires users to type \"CONFIRM DELETE\" before delete_file executes.",
          "Implement server-side validation that rejects delete_file calls for files tagged as backups, returning an error message suggesting archive_file.",
          "Expand tool descriptions to clarify use cases, adding guidance like \"Do not use for backup files\" to delete_file.",
          "Add few-shot examples to the system prompt demonstrating that requests involving \"backup\" or \"old\" should use archive_file."
        ],
        "correctIndex": 2,
        "explanation": "Clear, specific descriptions directly influence the agent’s tool selection reasoning, making it less likely to choose the wrong tool.",
        "choiceExplanations": [
          "This prevents accidental execution but does not improve the agent’s tool selection decision.",
          "This enforces policy after the wrong choice is made but does not directly improve initial selection.",
          "Clear, specific descriptions directly influence the agent’s tool selection reasoning, making it less likely to choose the wrong tool.",
          "Helpful, but less direct and less reliable than improving the tool descriptions themselves."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-29",
        "question": "Your CRM agent's delete_contact tool handles requests like \"delete the duplicate entry for Acme Corp.\" The database contains similarly named records (e.g., \"Acme Corp,\" \"Acme Corporation,\" \"ACME Corp Inc.\"), and analytics show 8% of deletions are reversed within 24 hours due to misidentified records. Users have also complained that the current multi-step confirmation flow adds too much friction to routine cleanup tasks. Which approach most effectively reduces the error rate while maintaining workflow efficiency?",
        "choices": [
          "Present matched records with differentiating fields and require single-click confirmation of the intended target before executing deletion.",
          "Require users to supply the exact record ID from the CRM Interface rather than using natural language references to contact names.",
          "Deploy automated duplicate detection that identifies and merges probable duplicates, removing the need for manual deletion requests.",
          "Implement soft-delete with a 30-day recovery window so users can undo mistakes without slowing down the deletion workflow."
        ],
        "correctIndex": 0,
        "explanation": "This directly addresses ambiguity by showing clear distinctions between similar records while keeping the workflow fast with a lightweight confirmation step.",
        "choiceExplanations": [
          "This directly addresses ambiguity by showing clear distinctions between similar records while keeping the workflow fast with a lightweight confirmation step.",
          "This reduces errors but adds significant friction and hurts usability for routine tasks.",
          "Helpful as a separate improvement, but it doesn’t solve incorrect deletions during manual requests.",
          "This mitigates impact after errors occur but does not reduce the error rate itself."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-60",
        "question": "Your process refund tool returns two types of errors: technical errors (\"503 Service Unavailable\", \"Connection timeout\") that are transient (5% of calls), and business errors (\"Order exceeds 3 day return window\", \"item already refunded\") that are permanent (12% of calls). Monitoring shows the agent wastes 3-4 turns retrying business errors that can never succeed. Currently, both error types return only a plain text message to Claude. What's the most effective way to reduce wasted retries while improving customer-facing response quality?",
        "choices": [
          "Add few-shot examples showing how to distinguish retriable from non-retriable errors by parsing error message text.",
          "Add a check refund eligibility tool that must be called before process refund to prevent business rule violations.",
          "Implement automatic retry logic at the tool level for technical errors only, passing business errors to Claude without retries.",
          "Return structured error responses with retriable false for business errors and a customer-friendly explanation for Claude to use."
        ],
        "correctIndex": 3,
        "explanation": "Structured error metadata lets the agent reliably distinguish permanent vs. transient failures, preventing wasted retries while improving user-facing responses.",
        "choiceExplanations": [
          "Parsing plain text error messages is brittle and unreliable compared to explicit structured signals.",
          "This may reduce some failures, but business errors can still occur and it adds extra tool calls and latency.",
          "This improves handling of transient failures, but Claude may still retry permanent business errors because it lacks explicit retryability information.",
          "Structured error metadata lets the agent reliably distinguish permanent vs. transient failures, preventing wasted retries while improving user-facing responses."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-61",
        "question": "Your agent has called lookup_order multiple times while investigating a customer's return requests. Each response includes 40+ fields (items, shipping details, payment inf outputs now represent the majority of the conversation's context. The customer mentions two more orders they want to discuss. What's the most effective approach before lookups?",
        "choices": [
          "Move all tool responses to a vector database with semantic indexing, retrieving relevant portions as the conversation continues",
          "Extract only return-relevant fields (items, purchase date, return window, status) from each existing order response, removing verbose details",
          "Have the model generate a natural language summary of each order's key details, replacing structured responses with prose descriptions",
          "Proceed with additional lookups without modifying the existing tool output context"
        ],
        "correctIndex": 1,
        "explanation": "This preserves the information needed for the current task while significantly reducing context bloat before additional lookups.",
        "choiceExplanations": [
          "This adds unnecessary infrastructure complexity for a short-lived conversational context problem.",
          "This preserves the information needed for the current task while significantly reducing context bloat before additional lookups.",
          "Natural language summaries are less compact and may omit structured details needed for accurate return handling.",
          "This worsens context crowding and increases the risk of degraded performance."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-62",
        "question": "During a billing dispute resolution, your agent successfully retrieves customer info via get_customer and order details via lookup_order, but when attempting to call process_refund, the tool returns a timeout error. The agent has enough information to explain the charges and verify refund eligibility, but cannot actually process the refund due to the backend failure. What approach best balances first-contact resolution with appropriate error handling?",
        "choices": [
          "Confirm the refund will be processed and close the conversation, since the system has all necessary information to complete it automatically",
          "Explain the billing, confirm refund eligibility, acknowledge the system issue preventing immediate processing, and offer escalation or retry later",
          "Escalate immediately to a human agent since the refund action cannot be completed",
          "Implement automatic retries with exponential backoff for process_refund, keeping the conversation open until the refund is successfully processed"
        ],
        "correctIndex": 1,
        "explanation": "This maximizes first-contact value by resolving what can be resolved, while transparently handling the backend failure.",
        "choiceExplanations": [
          "The refund was not actually processed. Confirming success would be inaccurate and misleading.",
          "This maximizes first-contact value by resolving what can be resolved, while transparently handling the backend failure.",
          "Escalation may be unnecessary if the issue is temporary and the agent can still provide useful assistance.",
          "Retries are useful for transient failures, but indefinitely blocking the conversation creates poor user experience and doesn’t guarantee success."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-63",
        "question": "Your agent is handling a billing dispute. After calling get_customer and lookup_order, it identifies that the dispute involves a promotional pricing error requiring manager approval—beyond the agent's authorization level. How should the workflow handle this mid-process escalation?",
        "choices": [
          "Persist the complete conversation and tool response history to a database, then call escalate_to_human with a reference ID.",
          "Call escalate_to_human passing only the customer's original message.",
          "Attempt the refund with process_refund anyway, escalating only if the system rejects the transaction.",
          "Compile a structured handoff with customer details, order info, and the identified issue before calling escalate_to_human."
        ],
        "correctIndex": 3,
        "explanation": "A structured handoff preserves context, reduces repetition, and enables efficient continuation by the human agent.",
        "choiceExplanations": [
          "Useful operationally, but the human agent still needs a concise, actionable summary rather than raw logs alone.",
          "This loses the investigation work already completed and forces the human agent to repeat steps.",
          "This violates authorization boundaries and business policy.",
          "A structured handoff preserves context, reduces repetition, and enables efficient continuation by the human agent."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-64",
        "question": "Production logs reveal inconsistent error handling: when lookup_order fails, the agent sometimes retries 5+ times (wasteful when the order ID doesn't exist), sometimes escalates immediately (premature for temporary network issues), and sometimes asks users for clarification (inappropriate when the issue is a backend permission error). Investigation shows your MCP tool returns uniform error responses: \"isError\": true, \"content\": [ \"type\": \"text\", \"text\": \"Operation failed\" ] . The agent cannot distinguish between error types. What's the most effective improvement?",
        "choices": [
          "Enhance error responses with structured metadata: include errorCategory (transient/validation/permission), isRetryable boolean, and a description of what caused the failure.",
          "Implement retry logic with exponential backoff in your MCP server for all errors, returning to the agent only after retries are exhausted.",
          "Add few-shot examples to the system prompt demonstrating how to interpret error message patterns and select appropriate responses for each.",
          "Create an analyze_error MCP tool the agent calls after any failure to determine the error category and recommended action."
        ],
        "correctIndex": 0,
        "explanation": "Structured error metadata gives the agent clear signals for deciding whether to retry, escalate, or ask the user for clarification, leading to consistent and appropriate handling.",
        "choiceExplanations": [
          "Structured error metadata gives the agent clear signals for deciding whether to retry, escalate, or ask the user for clarification, leading to consistent and appropriate handling.",
          "Retrying all errors wastes resources and still doesn’t help the agent distinguish permanent failures like validation or permission errors.",
          "Parsing generic text errors is brittle and unreliable compared to explicit structured metadata.",
          "This adds unnecessary complexity and extra tool calls when the information should already be present in the original error response."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-65",
        "question": "A customer raises three separate issues during one session: a refund inquiry (turns 1-15), a subscription question (turns 16-30), and a payment method update (turns 31-45). At turn 48, the customer asks \"What happened with my refund?\" The conversation is approaching context limits. What strategy best maintains the agent's ability to address all issues throughout the session?",
        "choices": [
          "Implement sliding window context that retains the most recent 30 turns.",
          "Extract and persist structured issue data (order IDs, amounts, statuses) into a separate context layer.",
          "Rely on MCP tools to re-fetch relevant information on demand when the customer references earller issues.",
          "Summarize earlier turns into a narrative description, preserving full message history only for the active issue."
        ],
        "correctIndex": 1,
        "explanation": "Structured persistence preserves critical state across multiple concurrent issues while minimizing context usage and enabling reliable recall later in the session.",
        "choiceExplanations": [
          "This would likely drop the earlier refund discussion entirely, preventing accurate follow-up handling.",
          "Structured persistence preserves critical state across multiple concurrent issues while minimizing context usage and enabling reliable recall later in the session.",
          "Tools can retrieve system data, but not the conversational context, decisions, or prior explanations from earlier turns.",
          "Narrative summaries may omit important structured details needed to accurately resume earlier issues."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-66",
        "question": "Your update_user_profile tool accepts a user_id (required) and an optional fields_to_update object. In testing, Claude frequently omits user_id or passes incorrectly structured data. What is most critical for helping Claude understand what parameter values to provide?",
        "choices": [
          "Clear parameter descriptions explaining expected format, such as \"user_id : UUID of the user to update (required)\"",
          "Verbose parameter names encoding format hints, such as user_id_string_uuid_format",
          "Strict JSON Schema type constraints marking user_id as required and defining fields_to_update as an object type",
          "Detailed error responses explaining why invalid parameter values were rejected"
        ],
        "correctIndex": 0,
        "explanation": "Clear, human-readable descriptions are the most important guidance for helping Claude understand what values to provide and how parameters should be structured.",
        "choiceExplanations": [
          "Clear, human-readable descriptions are the most important guidance for helping Claude understand what values to provide and how parameters should be structured.",
          "Overly verbose names reduce readability and are less effective than proper descriptions.",
          "Schema constraints help validation, but they don’t sufficiently explain semantic expectations like the required UUID format.",
          "Helpful after failure, but not the most critical factor for preventing mistakes initially."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-67",
        "question": "Production monitoring shows your search_catalog tool fails 12% of the time: 8% are network timeouts that succeed when immediately retried, while 4% are query syntax errors from malformed user-provided filters that never succeed regardless of retry attempts. Currently, both error types are returned to the agent identically, causing it to waste turns retrying syntax errors and telling users to \"try again later\" for timeouts. How should you modify the tool's error handling?",
        "choices": [
          "Apply exponential backoff retry logic to all errors uniformly, returning a generic \"service temporarily unavailable\" message after max retries are exhausted.",
          "Return all errors with a retryable boolean flag and error type details.",
          "Implement automatic retry with backoff for network timeouts inside the tool; return syntax errors immediately with parameter validation details.",
          "Add few-shot examples to your system prompt demonstrating how to distinguish network errors from syntax errors and handle each case appropriately."
        ],
        "correctIndex": 2,
        "explanation": "This cleanly separates responsibilities: Tool handles transient failures (timeouts) Tool immediately exposes non-retryable syntax errors with actionable feedback This prevents wasted retries and improves user-facing behavior.",
        "choiceExplanations": [
          "This wastes retries on non-recoverable syntax errors and hides useful diagnostic information from the agent.",
          "This improves clarity, but still pushes retry logic to the agent, which leads to inconsistent handling and wasted turns.",
          "This cleanly separates responsibilities: Tool handles transient failures (timeouts) Tool immediately exposes non-retryable syntax errors with actionable feedback This prevents wasted retries and improves user-facing behavior.",
          "Prompt-based reasoning is unreliable for error handling compared to explicit tool-level logic separation."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-68",
        "question": "Users frequently send ambiguous requests like \"book a venue for the party\" without specifying date, guest count, or budget. Your evaluation shows the assistant asks an average of 4.2 clarifying questions before taking any action, causing 35% of users to abandon mid-conversation. However, when you reduce questions, users sometimes receive recommendations that don't match their preferences. What's the most effective approach to improve this trade-off?",
        "choices": [
          "Instruct the assistant to state explicit assumptions based on conversation history, proceed with recommendations while inviting corrections, and reserve clarifying questions only for irreversible actions like confirming bookings.",
          "Configure the assistant to proceed with reasonable defaults (medium-sized venue, next weekend, moderate budget) without explicitly stating these assumptions, allowing users to provide corrections if results don't match expectations.",
          "Implement a structured intake form that collects all required parameters (date, guest count, budget, venue type) upfront before the assistant begins providing any recommendations.",
          "Configure the assistant to consolidate all clarifying questions into a single compound question (e.g., \"What date, guest count, and budget are you considering?\") to reduce the total number of conversational turns."
        ],
        "correctIndex": 3,
        "explanation": "This reduces user fatigue while still explicitly capturing required constraints, improving both completion rates and recommendation accuracy without over-questioning.",
        "choiceExplanations": [
          "This improves transparency, but it still relies on assumptions that may not fully align with user intent, leading to partial mismatches.",
          "Hidden defaults can reduce trust and lead to user confusion when outputs don’t match expectations.",
          "This ensures accuracy but introduces too much friction early in the flow, increasing drop-off.",
          "This reduces user fatigue while still explicitly capturing required constraints, improving both completion rates and recommendation accuracy without over-questioning."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-70",
        "question": "Your agent includes an update_game_score tool that accepts game_date (string), home_team (string), and away_team (string) parameters. Production logs reveal recurring issues: the agent uses team nicknames instead of official names, applies inconsistent date formats, and selects the wrong game when teams have rematches in the same season. What tool interface change would effectively prevent these errors?",
        "choices": [
          "Add a season parameter to disambiguate rematches, and add a confirm_before_update flag that returns the resolved game details for the agent to verify before the score is committed.",
          "Add detailed examples to the tool description showing the required date format and complete list of official team names.",
          "Add enum constraints listing valid team names for both team parameters, and add a regex pattern enforcing ISO 8601 format for the date parameter.",
          "Replace the three parameters with a single game_id parameter and a separate search_games lookup tool that returns matching game IDs."
        ],
        "correctIndex": 3,
        "explanation": "This removes ambiguity entirely by forcing the agent to resolve the exact entity first, then operate on a unique identifier, eliminating nickname errors, date mismatches, and rematch confusion.",
        "choiceExplanations": [
          "This improves safety via confirmation, but it still leaves ambiguity in identifying the correct game as a core issue.",
          "Examples help, but they don’t reliably prevent structural errors like wrong team identity or ambiguous match selection.",
          "This improves input validation, but it still does not solve the deeper problem of disambiguating multiple games between the same teams.",
          "This removes ambiguity entirely by forcing the agent to resolve the exact entity first, then operate on a unique identifier, eliminating nickname errors, date mismatches, and rematch confusion."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-71",
        "question": "Your resource allocation tool returns a simple acknowledgment message after provisioning is requested. Users frequently approve allocations and immediately ask \"how much did that cost?\" or \"which project was that?\" - indicating they confirmed without understanding the request. What tool design change would most effectively address this?",
        "choices": [
          "Add a user_acknowledged: boolean parameter that must be set true, with instructions for the agent to only set it after the user explicitly confirms they reviewed the details",
          "Implement a 60-second hold before execution completes, allowing users time to review pending allocations and cancel if needed",
          "Add a detail_level parameter with options \"minimal\" or \"comprehensive\" that controls how much context the agent presents in confirmations",
          "Return structured data including cost estimate, target project, resource specifications, and impact summary in the tool response"
        ],
        "correctIndex": 3,
        "explanation": "This ensures that every allocation includes explicit, structured, reviewable details, reducing uninformed approvals and enabling users to understand cost and impact before proceeding.",
        "choiceExplanations": [
          "This relies on agent discipline and is easy to bypass or mis-handle; it doesn’t guarantee users actually see or understand key details.",
          "Delays alone don’t improve understanding; they only slow execution and may frustrate users without ensuring informed approval.",
          "This improves formatting flexibility but does not ensure critical cost and impact information is consistently surfaced before approval.",
          "This ensures that every allocation includes explicit, structured, reviewable details, reducing uninformed approvals and enabling users to understand cost and impact before proceeding."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-83",
        "question": "When the agent calls lookup order and receives order details showing the item was purchased 45 days ago, how does the agentic loop determine whether to call process refund escalate to human next?",
        "choices": [
          "The agent executes the remaining steps in a tool sequence planned at the start of the request.",
          "The order details are added to the conversation and the model reasons about which action to take.",
          "The agent follows a pre-configured decision tree mapping order attributes to specific tool calls.",
          "The orchestration layer automatically routes to the next tool based on the order's status field."
        ],
        "correctIndex": 1,
        "explanation": "In an agentic loop, tool results (like “purchased 45 days ago”) are fed back into the model’s context, and the model re-evaluates the situation dynamically. It then decides whether to proceed with process_refund, escalate to a human, or take another action based on policy and the updated information. Why the others are not correct:",
        "choiceExplanations": [
          "Agentic systems are not static workflows; they adapt after each observation.",
          "In an agentic loop, tool results (like “purchased 45 days ago”) are fed back into the model’s context, and the model re-evaluates the situation dynamically. It then decides whether to proceed with process_refund, escalate to a human, or take another action based on policy and the updated information. Why the others are not correct:",
          "This is rule-based automation, not LLM-driven reasoning.",
          "That removes the model’s reasoning role and turns it into deterministic routing."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-84",
        "question": "The agent verifies customer identity through a multi-step process before resetting passwords. During testing, you notice that after the customer answers the third verification question, the agent asks them to provide their name again, as if the earlier exchange never happened. What's the most likely cause of this behavior?",
        "choices": [
          "Claude's memory retention is limited to two conversational turns by default, requiring explicit configuration to extend it.",
          "The prompt lacks instructions telling Claude to remember information across multiple exchanges.",
          "The verification tool is clearing the agent's internal state after each successful validation step.",
          "The conversation history isn't being passed in subsequent API requests."
        ],
        "correctIndex": 3,
        "explanation": "This is the most likely cause. The model is stateless, so if prior messages aren’t included in each request, it behaves as if earlier verification steps never happened—leading to repeated questions like asking for the name again.",
        "choiceExplanations": [
          "There is no fixed “two-turn memory limit” like this; context is determined by what the application sends, not a built-in short memory window.",
          "System prompts don’t control memory persistence. The model does not “forget” within context unless information is missing from input.",
          "Tools do not automatically reset conversational context unless explicitly designed to do so—and that would be an application-level bug, not the most likely general cause.",
          "This is the most likely cause. The model is stateless, so if prior messages aren’t included in each request, it behaves as if earlier verification steps never happened—leading to repeated questions like asking for the name again."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-85",
        "question": "When implementing your lookup_order MCP tool, the backend sometimes returns errors (e.g., \"Order not found\" or temporary database failures). What is the correct pattern for communicating these errors back to the agent?",
        "choices": [
          "Log the error server-side and return an empty result to avoid confusing the model",
          "Throw an exception from the tool handler so the agent framework can catch and log it",
          "Return the error message in the tool result content with the isError flag set to true",
          "Return a success response with a \"status\" field indicating the error type"
        ],
        "correctIndex": 2,
        "explanation": "This is the proper MCP pattern: the tool explicitly signals failure using isError: true, while still providing a readable error message so the agent can decide whether to retry, escalate, or inform the user.",
        "choiceExplanations": [
          "This hides critical failure information, making it impossible for the agent to distinguish “no data” from “system failure.”",
          "Exceptions are useful internally, but the agent still needs a structured tool response; raw exceptions don’t reliably propagate useful context to the model.",
          "This is the proper MCP pattern: the tool explicitly signals failure using isError: true, while still providing a readable error message so the agent can decide whether to retry, escalate, or inform the user.",
          "This is misleading because it treats failures as successful responses, which confuses downstream reasoning and tool orchestration."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-122",
        "question": "After expanding the agent's MCP tools with delivery-specific capabilities (check_delivery_status, contact_driver, issue_credit, apply_promo_code, update_delivery_address, reschedule_delivery), the total tool count has grown from 4 to 10. Your evaluation suite shows tool selection accuracy has dropped to 71%. Log analysis reveals the majority of errors involve the agent selecting between semantically overlapping tools-calling issue_credit when process_refund is correct, and calling check_delivery_status when lookup_order already returns the needed data. Which approach structurally eliminates the semantic overlaps that are being logged as the error source?",
        "choices": [
          "Split the tools across two sub-agents - a \"financial resolution\" agent with process_refund, issue_credit, and apply_promo_code, and a \"delivery\" agent with the remaining delivery tools - with a coordinator routing between them.",
          "Add few-shot examples to the system prompt demonstrating correct selection for each ambiguous tool pair, such as showing when issue_credit or process_refund is appropriate.",
          "Consolidate semantically overlapping tools-merge issue_credit and process_refund into a single resolve_compensation tool with an optional include_tracking flag.",
          "Enable the tool search tool with defer_loading on the six new tools, keeping the original four always loaded, so the agent dynamically calls it when needed."
        ],
        "correctIndex": 2,
        "explanation": ") The logged errors stem from semantic overlap between tools, where multiple tools can satisfy similar intents. Consolidating overlapping tools removes the ambiguity entirely, eliminating the need for the model to choose between near-equivalent actions. By designing tools around distinct user intents rather than overlapping implementations, tool selection becomes simpler and more reliable.",
        "choiceExplanations": [
          "() This reduces the number of tools visible to each agent but does not eliminate overlap within a domain. The financial agent would still need to choose between issue_credit and process_refund.",
          "() Few-shot examples can improve accuracy but do not remove the underlying ambiguity. The model must still make a difficult distinction between overlapping tools.",
          ") The logged errors stem from semantic overlap between tools, where multiple tools can satisfy similar intents. Consolidating overlapping tools removes the ambiguity entirely, eliminating the need for the model to choose between near-equivalent actions. By designing tools around distinct user intents rather than overlapping implementations, tool selection becomes simpler and more reliable.",
          "() Deferred loading reduces the number of immediately available tools but does not address the root cause of errors: overlapping tool semantics. Once loaded, the same ambiguity remains."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-123",
        "question": "Anthropic's tool use documentation states: \"Write instructive error messages. Instead of generic errors like 'failed', include what went wrong and what Claude should try next.\" A billing dispute agent uses lookup_order, which catches all exceptions and returns a tool_result with is_error: true and the message \"execution failed\". Monitoring shows two failure modes: the agent retries the identical call until hitting the turn limit, or it immediately calls escalate_to_human without trying alternative tools. Which change follows the documented recommendation and gives Claude the information it needs to select the correct recovery action for each error type?",
        "choices": [
          "Implement retry logic with exponential backoff inside each tool implementation so transient errors are resolved transparently within the tool before any failure result is surfaced to Claude in the agentic loop.",
          "Return error-type-specific messages with is_error: true, e.g., \"order not found-try get_customer to search by phone\" for data errors and \"Database timeout (transient)-retry should succeed\" for infrastructure errors.",
          "Remove is_error: true and return the error details as normal tool content, so Claude reasons about the response as data rather than treating it as a flagged failure condition that biases retry behavior.",
          "Add an error classification step in the agentic loop that intercepts tool errors before Claude sees them, tags each as \"retry\" \"try_alternative,\" or \"escalate,\" and adds that recommendation to the tool result."
        ],
        "correctIndex": 1,
        "explanation": ") Anthropic's recommendation is to provide instructive error messages that explain both what went wrong and what action Claude should take next. Error-specific messages give the model the context needed to distinguish between failures that warrant a retry and failures that require trying a different tool. This directly addresses the observed behaviors of repeated identical retries and premature escalation.",
        "choiceExplanations": [
          "() Internal retries can help with transient failures, but they do not solve the problem of providing actionable guidance when an error is ultimately returned to Claude.",
          ") Anthropic's recommendation is to provide instructive error messages that explain both what went wrong and what action Claude should take next. Error-specific messages give the model the context needed to distinguish between failures that warrant a retry and failures that require trying a different tool. This directly addresses the observed behaviors of repeated identical retries and premature escalation.",
          "() Errors should still be clearly identified as errors. Removing is_error: true obscures failure states and can lead to incorrect reasoning about tool outputs.",
          ") While potentially helpful, this adds an external classification layer rather than following the documented guidance. The recommendation is for tools themselves to return informative, actionable error messages that explain the failure and next step."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-127",
        "question": "Your agent is handling a billing dispute. After calling get_customer and lookup_order, it identifies that the dispute involves a promotional pricing ero approval—beyond the agent's authorization level. How should the workflow handle this mid-process escalation?",
        "choices": [
          "Persist the complete conversation and tool response history to a database, then call escalate_to_human with a reference ID.",
          "Compile a structured handoff with customer details, order info, and the identified issue before calling escalate_to_human",
          "Attempt the refund with process refund anyway, escalating only if the system rejects the transaction.",
          "Call escalate_to_human passing only the customer's original message."
        ],
        "correctIndex": 1,
        "explanation": ". () When an agent determines that a case requires human approval or exceeds its authorization level, it should create a structured handoff containing all relevant context gathered during the investigation. This enables the human agent to continue from the current state without repeating work and ensures a smooth transition.",
        "choiceExplanations": [
          "() While storing history may be useful, providing only a reference ID does not ensure the human agent receives a clear summary of the issue or the investigation already performed.",
          ". () When an agent determines that a case requires human approval or exceeds its authorization level, it should create a structured handoff containing all relevant context gathered during the investigation. This enables the human agent to continue from the current state without repeating work and ensures a smooth transition.",
          ") The scenario states that the refund amount exceeds the agent's authorization level. The agent should respect authorization boundaries and escalate rather than attempting the action.",
          "() Passing only the original message omits the customer information, order details, and findings already collected, forcing the human agent to repeat the investigation."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-128",
        "question": "Your agent has called lookup_order multiple times while investigating a customer's return requests. Each response includes 40+ fields (items, shipping details, payment info, status history). Tool outputs now represent the majority of the conversation's context. The customer mentions two more orders they want to discuss. What's the effective approach before making additional lookups?97",
        "choices": [
          "Extract only return-relevant fields (items, purchase date, return window, status) from each existing order response, removing verbose details",
          "Proceed with additional lookups without modifying the existing tool output context",
          "Move all tool responses to a vector database with semantic indexing, retrieving relevant portions as the conversation continues",
          "Have the model generate a natural language summary of each order's key details, replacing structured responses with prose descriptions"
        ],
        "correctIndex": 0,
        "explanation": ". () As tool outputs begin to dominate the context window, the best approach is to compress and retain only the information relevant to the current task. Since the conversation is focused on return requests, fields such as items, purchase date, return eligibility, and order status should be preserved, while unrelated details like payment information, full shipping records, and extensive status history can be removed. This maintains the necessary context while conserving tokens for future interactions and tool calls.",
        "choiceExplanations": [
          ". () As tool outputs begin to dominate the context window, the best approach is to compress and retain only the information relevant to the current task. Since the conversation is focused on return requests, fields such as items, purchase date, return eligibility, and order status should be preserved, while unrelated details like payment information, full shipping records, and extensive status history can be removed. This maintains the necessary context while conserving tokens for future interactions and tool calls.",
          ". () Continuing to accumulate large tool responses wastes context window space and increases the risk of losing important information later in the conversation.",
          ". () While retrieval systems can be useful for long-term memory, this is a more complex solution than necessary. The immediate issue is excessive tool output, which can be addressed more effectively through targeted context reduction.",
          ". () Natural language summaries may omit important fields and are generally less reliable than retaining a compact, structured representation of the relevant data."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-129",
        "question": "Production logs show that when the agent handles complex billing disputes requiring 6+ tool calls, it sometimes exhausts its max_turns limit after gathering data and before completing resolution or escalating. The team's goal is to guarantee that every customer interaction ends with either a completed resolution or a human escalation, regardless of how the agent loop terminates. Which approach achieves this guarantee?",
        "choices": [
          "Add orchestration-layer code that checks the agent's outcome after each loop termination - if the loop ended without a completed resolution or escalation, programmatically call escalate_to_human with the accumulated conversation context and tool results.",
          "Implement a pre-tool-use hook that counts tool invocations and terminates the loop with an automatic escalation once the agent reaches 80% of its remaining actions.",
          "Add system prompt instructions telling the agent to call escalate_to_human with a summary of its findings whenever it determines it cannot resolve the dispute.",
          "Split the workflow into two sequential agent invocations — a first agent gathers information via get_customer and lookup_order, then the second agent uses that data and handles process_refund or escalate_to_human, each with separate turn budgets."
        ],
        "correctIndex": 0,
        "explanation": "() This is the only option that guarantees every interaction ends in either a successful resolution or a human escalation. By enforcing the check outside the agent loop, the system remains robust even if the agent exhausts its max_turns, encounters unexpected behavior, or fails to explicitly escalate. The orchestration layer acts as a reliable fallback that ensures no case is left unresolved.",
        "choiceExplanations": [
          "() This is the only option that guarantees every interaction ends in either a successful resolution or a human escalation. By enforcing the check outside the agent loop, the system remains robust even if the agent exhausts its max_turns, encounters unexpected behavior, or fails to explicitly escalate. The orchestration layer acts as a reliable fallback that ensures no case is left unresolved.",
          "() This may reduce the likelihood of hitting the turn limit, but it does not guarantee resolution or escalation in all termination scenarios.",
          "() Prompt instructions improve behavior but cannot provide a hard guarantee, especially when the agent reaches max_turns before making that decision.",
          "() This may reduce turn-limit issues but still does not guarantee that one of the agents will successfully resolve or escalate every case. An external enforcement mechanism is still required."
        ],
        "difficulty": "medium"
      },
      {
        "id": "tools-145",
        "question": "Compliance requires that refunds exceeding $500 must automatically escalate to a human agent-this rule cannot be left to model discretio Despite clear system prompt instructions, production logs show the agent occasionally processes high-value refunds directly (3% failure rate) How should you achieve guaranteed compliance?",
        "choices": [
          "Modify the refund tool to return an error with message \"Amount exceeds policy limit please escalate\" when threshold is exceeded.",
          "Implement a hook to intercept tool calls when the refund process amount exceeds $500, block it and invoke human escalation.",
          "Strengthen the system prompt with emphatic language: \"CRITICAL POLICY! Refunds over $500 MUST trigger human escalation. NEVER process these directly!\"",
          "Add few-shot examples to the prompt showing correct escalation behavior at various refund amounts ($40, $500, $600)."
        ],
        "correctIndex": 1,
        "explanation": "Compliance requirements need deterministic enforcement, not model judgment. A hook that intercepts refund tool calls and blocks any refund over $500 guarantees that prohibited actions cannot occur and automatically triggers human escalation.",
        "choiceExplanations": [
          "An error message depends on the model interpreting and handling it correctly and does not provide guaranteed enforcement.",
          "Compliance requirements need deterministic enforcement, not model judgment. A hook that intercepts refund tool calls and blocks any refund over $500 guarantees that prohibited actions cannot occur and automatically triggers human escalation.",
          "Prompts improve behavior but cannot guarantee 100% compliance, as shown by the existing 3% failure rate.",
          "Examples may improve adherence but remain probabilistic and cannot enforce a hard compliance rule."
        ],
        "difficulty": "easy"
      },
      {
        "id": "tools-146",
        "question": "Production logs reveal inconsistent error handling: when tool_code fails, the agent sometimes retries 5 times (even if the tool_id doesn't exist), sometimes escalates immediately (premature for temporary network issues), and sometimes adds user-friendly explanation (inappropriate when the issue is a backend permission error). Investigation shows four MCP tool returns uniform error responses: \"status\": \"error\", \"content\": \" \"type\": \"Error\", \"message\": \"Operation failed.\" \" . The agent learns different types. What's the most effective improvement?",
        "choices": [
          "Implement retry logic with exponential backoff in your MCP server for all errors, returning to the agent only after retries are exhausted.",
          "Create an analyze_error MCP tool the agent calls after any failure to determine the error category and recommended action.",
          "Add a few-shot examples to the system prompt demonstrating how to interpret error message patterns and select appropriate responses for each.",
          "Enhance error responses with structured metadata. Include error_category (transient/retriable/permission), reason, and a description of what caused the failure."
        ],
        "correctIndex": 3,
        "explanation": "The current error responses are generic (\"Operation failed.\"), giving the agent no information to distinguish between transient network issues, invalid tool IDs, or permission errors. Structured metadata enables the agent to take the appropriate action—retry, escalate, or inform the user—consistently and correctly.",
        "choiceExplanations": [
          "Not all errors are retriable. Retrying permission or invalid-tool errors wastes time and can worsen behavior.",
          "Adds extra complexity and latency. The root problem is that the original errors lack sufficient information.",
          "Examples cannot reliably infer error types from identical, generic error messages.",
          "The current error responses are generic (\"Operation failed.\"), giving the agent no information to distinguish between transient network issues, invalid tool IDs, or permission errors. Structured metadata enables the agent to take the appropriate action—retry, escalate, or inform the user—consistently and correctly."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-147",
        "question": "Production logs reveal inconsistent error handling. When looking up facts, the agent sometimes retries 5+ times (sadly, when the outer ID doesn't exist), sometimes escalates immediately (prematurely for temporary network issues), and sometimes asks users for clarification (inappropriate when the issue is a backend permission error). Investigation shows your MCP tool returns uniform error responses (\"isError\": true, \"context\": \"type\": \"text\", \"text\": \"Operation failed.\" ). The agent cannot distinguish between error types. What's the most effective improvement?",
        "choices": [
          "Implement retry logic with exponential backoff in your MCP service for all errors returning to the agent only after retries are exhausted.",
          "Create an analyze_error MCP tool that the agent calls after any failure to determine the error category and recommended action.",
          "Add ten shot examples to the system's conduct_demo training to interpret error message context and select appropriate responses for each.",
          "Return structured error metadata in MCP responses."
        ],
        "correctIndex": 3,
        "explanation": "The agent receives the same generic error (\"Operation failed.\") for every failure, so it cannot determine whether it should retry, escalate, or inform the user. Returning structured metadata (for example, error_category, reason, retriable, and permission_denied) enables consistent and appropriate error handling.",
        "choiceExplanations": [
          "Not all errors are retriable. Retrying invalid IDs or permission errors wastes time and may cause repeated failures.",
          "Adds extra complexity and latency. The root issue is insufficient information in the original error response.",
          "Examples cannot reliably infer different error types from identical, generic error messages.",
          "The agent receives the same generic error (\"Operation failed.\") for every failure, so it cannot determine whether it should retry, escalate, or inform the user. Returning structured metadata (for example, error_category, reason, retriable, and permission_denied) enables consistent and appropriate error handling."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-148",
        "question": "After expanding the agent's MCP tools with delivery-specific capabilities [apply_promo_code, update_delivery_address, reconcile_delivery], the total tool count has grown from 1 to 7. We have observed that the agent now shows tool selection accuracy has dropped from 86% to 71%. Log analysis reveals the majority of errors involve the agent selecting between semantically overlapping tools — calling issue_credit when process_refund was correct, and calling check_delivery_status when looking order_allready_returns_the_needed_data. Which approach structurally eliminate the semantic overlap identified in the error source?",
        "choices": [
          "Consolidate semantically overlapping tools – merge issue_credit and process_refund into a single handle_promotions tool with an action parameter and fold check_delivery_status into lookup_order with an optional include_tracking flag.",
          "Enable the tool search tool with defer_loading on the six new tools, keeping the original two always loaded, so the agent dynamically discovers specialized tools only when needed.",
          "Add few-shot examples to the system prompt demonstrating correct selection for each ambiguous tool, such as showing when issue_credit applies versus when process_refund is appropriate.",
          "Split the tools across two sub-agents — a 'financial resolution' agent with issue_credit, process_refund, return_order, and apply_promo_code and a 'delivery operations' agent with the remaining delivery tools — with a coordinating routing between them."
        ],
        "correctIndex": 0,
        "explanation": "The primary issue is semantic overlap between tools. When multiple tools perform similar functions or return overlapping information, the agent struggles to choose correctly. Consolidating overlapping tools into unified interfaces removes ambiguity and structurally improves tool selection accuracy.",
        "choiceExplanations": [
          "The primary issue is semantic overlap between tools. When multiple tools perform similar functions or return overlapping information, the agent struggles to choose correctly. Consolidating overlapping tools into unified interfaces removes ambiguity and structurally improves tool selection accuracy.",
          "Reduces the number of simultaneously loaded tools but does not eliminate the underlying semantic overlap.",
          "Examples may improve selection temporarily, but they do not address the root cause of overlapping tool capabilities.",
          "Domain separation can help organization, but overlap still exists within domains (for example, issue_credit vs. process_refund), so ambiguity remains."
        ],
        "difficulty": "hard"
      },
      {
        "id": "tools-149",
        "question": "You're implementing the escalation logic for when the agent should call a human. Your team processes for different approaches for triggering escalation. Which approach will most reliably identify cases that genuinely require human intervention?",
        "choices": [
          "Instruct the agent to escalate when the customer requests a human. When the issue requires policy exceptions, or the agent can not make meaningful progress.",
          "Configure the agent to escalate after three consecutive tools fails to resolve the customer's stated issue, ensuring a reasonable attempt before involving a human.",
          "Build a rules engine that maps specific issue types, customer segments and product categories to escalation decisions, removing the need for model judgment calls.",
          "Implement sentiment analysis that monitors for frustration indicators (e.g., all-caps, repeated questions, exclamations) and trigger escalation when the frustration score exceeds a configured threshold."
        ],
        "correctIndex": 0,
        "explanation": "This approach directly identifies situations that genuinely require human intervention. It covers customer preference, requests that need policy exceptions or discretionary decisions, and cases where the agent is unable to make meaningful progress. It provides a balanced and reliable escalation strategy.",
        "choiceExplanations": [
          "This approach directly identifies situations that genuinely require human intervention. It covers customer preference, requests that need policy exceptions or discretionary decisions, and cases where the agent is unable to make meaningful progress. It provides a balanced and reliable escalation strategy.",
          "Tool failures do not always mean a human is needed, and some cases require immediate escalation without waiting for multiple failures.",
          "A rigid rules engine is difficult to maintain and cannot capture all situations that require human judgment or customer preference.",
          "Frustration may indicate dissatisfaction, but it is not a reliable indicator that human intervention is necessary. Thank you Thank you for being so interested in the premium exam material. I'm glad to hear that you found it informative and helpful. If you have any feedback or thoughts on the bumps, I would love to hear them. Your insights can help me improve our writing and better understand our readers. Best of Luck You have worked hard to get to this point, and you are well-prepared for the exam Keep your head up, stay positive, and go show that exam what you're made of! Feedback More Papers Total: 149 Questions Link: https://certyiq.com/papers/anthropic/claude-certified-architect"
        ],
        "difficulty": "easy"
      }
    ]
  },
  {
    "id": "extraction",
    "name": "Structured Data Extraction",
    "description": "Extracting reliable structured JSON from documents with schemas, validation, and confidence-based routing.",
    "color": "#2DD4BF",
    "icon": "braces",
    "order": 2,
    "questions": [
      {
        "id": "extraction-30",
        "question": "After Implementing tool use with strict schema definitions, JSON syntax errors are eliminated, but 5% of extractions still have valid JSON with empty arrays or null values for required fields like citations and methodology. Spot-checking reveals that source documents contain this information, but in varied formats—Inline citations vs. bibliographies, methodology sections vs. details embedded in Introductions. What's the most effective way to address these failures?",
        "choices": [
          "Modify your schema to make citations and methodology optional, and flag Incomplete records for manual review rather than falling validation.",
          "Build a regex-based post-processing layer that scans source documents for citation patterns and methodology keywords, populating empty fields when the model falls to extract.",
          "Add few-shot examples demonstrating extractions from documents with varied structures—showing how to identify citations in different formats and locate methodology details across section types.",
          "Implement retry logic that re-sends requests when validation detects empty required fields."
        ],
        "correctIndex": 2,
        "explanation": "This directly improves the model’s ability to generalize across diverse document formats, addressing the root cause of missed extractions.",
        "choiceExplanations": [
          "This lowers data quality standards and avoids solving the extraction problem.",
          "Regex approaches are brittle and unreliable across varied formats, especially for complex structures like methodology.",
          "This directly improves the model’s ability to generalize across diverse document formats, addressing the root cause of missed extractions.",
          "Retries without improving guidance will likely produce the same incomplete outputs."
        ],
        "difficulty": "hard"
      },
      {
        "id": "extraction-31",
        "question": "The system processes product reviews using tool use with a defined schema: rating (integer 1-5), pros (string array), cons (string array), and overall_sentiment (enum: positive, ne Testing reveals two issues with brief or ambiguous reviews (-20% of the dataset): (1) for reviews like \"Great product!\", Claude fabricates specific pros and cons rather than Indica Information isn't explicitly stated, and (2) for sarcastic reviews like \"Well that was.. interesting\", Claude picks sentiment arbitrarily since there's no option for ambiguous cases. W modification best addresses both issues?",
        "choices": [
          "Make pros and cons optional fields, and add \"neutral\" and \"unclear\" to the sentiment enum",
          "Allow empty arrays for pros/cons as valid output, and add \"unclear\" ss the sentiment enum",
          "Add an extraction_confidence field (0.0-1.0) for each value, and filter outputs where any confidence falls below a threshold.",
          "Allow null values for pros/cons, and add \"unclear\" to the sentiment earum."
        ],
        "correctIndex": 1,
        "explanation": "This prevents fabrication by allowing explicitly empty outputs when no details are present, and “unclear” handles ambiguous or sarcastic sentiment appropriately.",
        "choiceExplanations": [
          "Making fields optional can lead to inconsistent outputs, and “neutral” doesn’t solve ambiguity—it’s different from “unclear”.",
          "This prevents fabrication by allowing explicitly empty outputs when no details are present, and “unclear” handles ambiguous or sarcastic sentiment appropriately.",
          "This adds complexity but doesn’t prevent fabrication or resolve ambiguity in outputs.",
          "Nulls are less consistent than empty arrays for structured outputs and can complicate downstream processing."
        ],
        "difficulty": "hard"
      },
      {
        "id": "extraction-32",
        "question": "Your extraction system implements automatic retries when validation fails. On each retry, the specific validation error is appended to the prompt. This retry-with-error-feedback approach resolves most failures within 2-3 attempts. For which failure pattern would additional retries be LEAST effective?",
        "choices": [
          "The model extracts \"et al.\" for co-authors when the full list exists only in an external document not in the input",
          "The model extracts citation counts as locale-formatted strings (\"1234\") when the schema requires integers",
          "The model extracts dates as ISO 8601 datetime strings (\"2003-03-15T00:00:00Z\") when the schema requires only the date portion (YYYY-MM-DD)",
          "The model extracts keywords as a nested object organized by category when the schema requires a flat array of strings"
        ],
        "correctIndex": 0,
        "explanation": "Retries won’t help because the required information is not present in the input context. The model cannot recover missing data through repeated attempts.",
        "choiceExplanations": [
          "Retries won’t help because the required information is not present in the input context. The model cannot recover missing data through repeated attempts.",
          "This is a formatting issue that can be corrected through retries with validation feedback.",
          "Also a format mismatch, which retries can fix easily.",
          "This is a structural mismatch that can typically be corrected with retry feedback."
        ],
        "difficulty": "easy"
      },
      {
        "id": "extraction-33",
        "question": "Your invoice extraction uses tool use with strict JSON schemas. JSON syntax errors never occur, but 12% of extractions fail semantic validation--for example, line Item amounts don't extracted total, or vendor IDs don't match valid formats. These failures currently route to manual review. What's the most effective approach to reduce manual review volume while m accuracy?",
        "choices": [
          "Retry the extraction up to 3 times when validation fallis, accepting the first result that passes validation.",
          "Implement post-processing logic that automatically corrects common amors, such as recalculating totais from line items when sums don't match.",
          "When validation falls, make a follow-up request with the document, extraction, and validation errors for model correction.",
          "Add stricter schema constraints with detailed field descriptions to prevent the model from generating invalid values initially."
        ],
        "correctIndex": 2,
        "explanation": "This provides targeted feedback, enabling the model to fix specific issues, significantly reducing manual review while maintaining accuracy.",
        "choiceExplanations": [
          "Retries without targeted feedback often repeat the same mistakes and don’t reliably fix semantic inconsistencies.",
          "While useful for specific cases, this is narrow and brittle, and doesn’t address broader validation failures like incorrect IDs.",
          "This provides targeted feedback, enabling the model to fix specific issues, significantly reducing manual review while maintaining accuracy.",
          "Schema improvements help upfront, but they cannot fully prevent semantic errors like mismatched totals."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-34",
        "question": "Your team is extracting structured data from 50,000 legacy legal contracts under a two-week deadline. Initial testing with 500 sample documents shows 82% pass JSON schema first attempt, while the remaining 18% fall due to diverse issues—missing required fields, malformed dates, and incorrectly identified parties. Documents that fail typically need refinements targeting their specific failure modes before extraction succeeds. Which batch processing strategy is the most cost-efficient while still meeting the deadline?",
        "choices": [
          "Split documents into 10 sequential batches of 5,000 each, analysing results and refining prompts between batches to improve extraction quality progressively.",
          "Submit all 50,000 documents via batch API, then submit failed extractions in successive batches—refining prompts between each batch—until all documents pass validation.",
          "Use the real-time API for all 50,000 documents since the batch API's 24-hour processing window creates unacceptable deadline risk.",
          "Process 2,000 sample documents via real time API to identify failure patterns and refine prompts, then batch process all 50,000 with the optimized prompts."
        ],
        "correctIndex": 1,
        "explanation": "This maximizes throughput and parallelism upfront, ensuring the deadline is met. Then it uses targeted iterative refinement only on failures, making it cost-efficient while handling diverse failure modes effectively.",
        "choiceExplanations": [
          "This introduces unnecessary sequential delays and reduces throughput, risking the deadline.",
          "This maximizes throughput and parallelism upfront, ensuring the deadline is met. Then it uses targeted iterative refinement only on failures, making it cost-efficient while handling diverse failure modes effectively.",
          "This is unnecessarily expensive and not required given batch processing capabilities.",
          "While proactive, this assumes failure patterns generalize well, which the scenario suggests they don’t—since failures are diverse and require case-specific refinements."
        ],
        "difficulty": "hard"
      },
      {
        "id": "extraction-35",
        "question": "Your extraction pipeline processes contracts that frequently include amendments. When a contract contains both original terms and later amendments (e.g., original clause specifies \"30-day payment terms\" while Amendment 1 changes this to \"45 days\"), the model inconsistently extracts one value or the other with no indication of which applies. What's the most effective approach to improve extraction accuracy for documents with amendments?",
        "choices": [
          "Preprocess documents with a classifier that identifies and removes superseded sections before the main extraction step.",
          "Implement post-extraction validation using pattern matching to detect amendments and flag those extractions for manual review.",
          "Redesign the schema so amended fields capture multiple values, each with source location and effective date.",
          "Add prompt instructions to always extract the most recent amendment value and ignore superseded original terms."
        ],
        "correctIndex": 2,
        "explanation": "This preserves both original and amended values with context, enabling accurate interpretation and avoiding ambiguity about which value applies.",
        "choiceExplanations": [
          "This is brittle and risky—accurately identifying and removing superseded clauses is complex and may lead to loss of important context.",
          "This increases manual review but does not improve extraction accuracy or resolve ambiguity.",
          "This preserves both original and amended values with context, enabling accurate interpretation and avoiding ambiguity about which value applies.",
          "This relies on model judgment, which is inconsistent, and loses traceability of how values changed over time."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-36",
        "question": "Your system must extract event details from calendar invitations and output JSON that strictly conforms to a schema with fields for title, date, time, location, and attendees. Downstream reject any malformed or non-conformant JSON. What approach provides the most reliable schema compliance?",
        "choices": [
          "Define a tool with your target schema as input parameters and have Claude call it with the extracted data.",
          "Pre-fill Claude's response with an opening brace to force JSON output, then complete and parse the response.",
          "Append instructions like \"Output only valid JSON matching the schema exactly\" and implement retry logic to re-prompt when JSON parsing fails.",
          "Include detailed JSON formatting instructions and the target schema in your prompt, then parse Claude's text response as JSON."
        ],
        "correctIndex": 0,
        "explanation": "Tool use enforces strict schema compliance at generation time, ensuring valid, structured JSON that downstream systems can reliably consume.",
        "choiceExplanations": [
          "Tool use enforces strict schema compliance at generation time, ensuring valid, structured JSON that downstream systems can reliably consume.",
          "This is a fragile workaround and does not guarantee valid or schema-compliant JSON.",
          "Helpful but not reliable—models can still produce malformed or non-conformant JSON.",
          "Prompt-based formatting alone cannot guarantee strict compliance, especially in edge cases."
        ],
        "difficulty": "easy"
      },
      {
        "id": "extraction-37",
        "question": "Your schema includes a skills: string[] field. Production monitoring reveals three consistency issues: (1) compound phrases like \"Python and SQL\" are sometimes kept as one entry, sometimes split; (2) implied but unstated skills occasionally appear in extractions; (3) similar documents produce wildly different array lengths (5-10 vs 40+ entries). Your prompt currently says \"Extract skills mentioned.\" What's the most effective improvement?",
        "choices": [
          "Add constraints: \"Extract 10-20 skills maximum, one skill per entry, only explicitly named skills.\"",
          "Add post-extraction normalization that maps skills to a canonical taxonomy and deduplicates similar entries.",
          "Enrich the schema to [scondidering] to capture extraction metadata.",
          "Add few-shot examples demonstrating compound phrase handling, explicit mention criteria, and appropriate entry granularity."
        ],
        "correctIndex": 3,
        "explanation": "Examples directly guide the model on how to split, what to include, and the expected level of detail, addressing all three issues effectively.",
        "choiceExplanations": [
          "This enforces limits but is arbitrary and may exclude valid skills or still leave ambiguity in how to split phrases.",
          "Helpful downstream, but it does not fix inconsistent extraction behavior at the source.",
          "Adds complexity but does not directly address inconsistency in skill identification and formatting.",
          "Examples directly guide the model on how to split, what to include, and the expected level of detail, addressing all three issues effectively."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-38",
        "question": "Your pipeline uses a tool called extract_metadata with a JSON schema for paper details. You've also defined lookup_citations and verify_doi tools for enrichment. During testing, you notice that when users include requests like \"extract the metadata and tell me how cited it is,\" Claude sometimes calls lookup_citations first, which fails because it needs the DOI that extract_metadata would provide. What's the most effective way to ensure structured metadata extraction happens first?",
        "choices": [
          "Set tool choice to (\"type\": \"tool\", \"name\": \"extract_metadata\") and process the enrichment requests in subsequent turns after receiving the extracted metadata.",
          "Set tool choice to \"any\" so Claude must use a tool, combined with system prompt instructions prioritizing extract_metadata.",
          "Set tool choice to (\"type\": \"tool\", \"name\": \"extract_metadata\") for every API call in the pipeline, ensuring Claude always extracts metadata before any enrichment can occur.",
          "Set tool choice to \"auto\" and reorder the tool definitions so extract_metadata appears first in the tools array, since Claude prioritizes earlier-listed tools."
        ],
        "correctIndex": 0,
        "explanation": "This enforces the correct execution order, ensuring required data (like DOI) is available before dependent tools are called.",
        "choiceExplanations": [
          "This enforces the correct execution order, ensuring required data (like DOI) is available before dependent tools are called.",
          "This does not guarantee ordering—Claude may still choose the wrong tool first.",
          "This is too rigid and prevents legitimate use of other tools in later steps.",
          "Tool ordering does not reliably control selection or execution order."
        ],
        "difficulty": "hard"
      },
      {
        "id": "extraction-39",
        "question": "Your system has been operating with 100% human review for 3 months. Analysis shows that extractions with model confidence >90% have 97% accuracy overall. To reduce reviewer workload, you plan to automate high-confidence extractions. Before deploying, what validation step is most critical?",
        "choices": [
          "Verify that 97% accuracy meets requirements for all downstream systems that consume the extracted data.",
          "Analyze accuracy by document type and field to verify high-confidence extractions perform consistently across all segments, not just in aggregate.",
          "Compare accuracy at different confidence thresholds (85%, 90%, 95%) to find the optimal cutoff that maximizes automation while minimizing errors.",
          "Run a two-week pilot routing 25% of high-confidence extractions directly to downstream systems and monitor error reports."
        ],
        "correctIndex": 1,
        "explanation": "Aggregate accuracy can hide weak spots. You need to ensure confidence >90% is trustworthy across all segments, otherwise automation may introduce systematic errors.",
        "choiceExplanations": [
          "Important, but it doesn’t ensure the confidence signal is reliable across different cases—it only checks overall acceptability.",
          "Aggregate accuracy can hide weak spots. You need to ensure confidence >90% is trustworthy across all segments, otherwise automation may introduce systematic errors.",
          "Useful for tuning, but only after confirming the confidence signal is consistent and reliable across segments.",
          "A pilot is valuable, but deploying without validating segment-level reliability first introduces avoidable risk."
        ],
        "difficulty": "easy"
      },
      {
        "id": "extraction-40",
        "question": "Your extraction system uses tool_use with a JSON schema containing 12 fields and detailed descriptions, totaling approximately 2,500 tokens for the complete tool definition. Processing documents under 150K tokens yields 98% accuracy. For documents between 175-190K tokens, accuracy drops to 71%, with information from the final third consistently missed. The model's context window is 200K tokens. What is the most likely cause?",
        "choices": [
          "Tool definitions consume input context tokens. Combined with system prompts and document content, the total approaches the context limit, degrading end-of-document processing.",
          "Very long documents exceed the model's effective attention span regardless of context limits, causing accuracy degradation for content farther from the prompt instructions.",
          "The model distributes attention proportionally across input length, causing fields mentioned only once near the document's end to receive insufficient processing focus.",
          "Schemas exceeding 8-10 fields increase decision complexity during parameter generation, reducing extraction accuracy independent of document length."
        ],
        "correctIndex": 0,
        "explanation": "The tool schema (~2,500 tokens) plus system prompts and large documents push total input close to the 200K context limit, causing truncation or reduced attention to the final portion—hence missed information in the last third.",
        "choiceExplanations": [
          "The tool schema (~2,500 tokens) plus system prompts and large documents push total input close to the 200K context limit, causing truncation or reduced attention to the final portion—hence missed information in the last third.",
          "While attention can vary, the sharp drop near the context boundary strongly indicates a context limit issue, not general attention decay.",
          "This is a weaker effect and does not explain the consistent failure in the final third tied to document size thresholds.",
          "Schema size is constant across cases; it does not explain why accuracy drops only for longer documents."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-41",
        "question": "Your extraction pipeline processes invoices and extracts line items, subtotals, tax amounts, and grand totals. During evaluation, you discover that in 18% of extractions, the sum of extracted line item amounts doesn't match the extracted grand total—sometimes due to OCR errors in the source document, sometimes due to extraction mistakes by the model. Downstream accounting systems reject records with mismatched totals. What's the most effective approach to improve extraction reliability?",
        "choices": [
          "Add a \"calculated total\" field where the model sums extracted line items alongside a \"stated_total\" field. Flag records for human review when values differ.",
          "Extract line items and totals independently, then use a separate validation model to reconcile discrepancies by determining which extracted values are most likely correct.",
          "Add few-shot examples demonstrating invoices where extracted line items sum correctly to the stated total, encouraging the model to produce mathematically consistent extractions.",
          "Implement post-processing that automatically adjusts line item amounts proportionally when their sum doesn't match the stated total."
        ],
        "correctIndex": 0,
        "explanation": "This preserves both sources of truth and enables reliable validation. Discrepancies can be flagged explicitly, improving accuracy without silently altering financial data.",
        "choiceExplanations": [
          "This preserves both sources of truth and enables reliable validation. Discrepancies can be flagged explicitly, improving accuracy without silently altering financial data.",
          "This adds complexity and uncertainty—“guessing” which value is correct can introduce errors in financial data.",
          "Helpful but insufficient—does not handle OCR errors or real inconsistencies in source documents.",
          "This modifies financial data artificially, which is risky and unacceptable for accounting accuracy."
        ],
        "difficulty": "hard"
      },
      {
        "id": "extraction-42",
        "question": "Your extraction system processes two document types: standard monthly reports (archived after processing) and urgent exception reports (must trigger business alerts within 30 minutes of receipt). Both use the same JSON schema. You want to minimize API costs while meeting latency requirements. How should you architect the processing pipeline?",
        "choices": [
          "Submit all documents to the Batch API with custom ids for tracking. When results arrive, immediately process urgent documents and trigger delayed alerts for exceptions.",
          "Submit all documents to the real-time Messages API to ensure consistent processing latency across document types.",
          "Queue all documents and submit hourly batches, flagging urgent documents for expedited handling when batch results return.",
          "Route standard reports to the Batch API for 50% cost savings, and route urgent exception reports to the real-time Messages API."
        ],
        "correctIndex": 3,
        "explanation": "This balances cost efficiency and latency requirements, ensuring urgent reports are processed quickly while optimizing cost for non-urgent ones.",
        "choiceExplanations": [
          "Batch processing introduces delays that can exceed the 30-minute requirement, making it unsuitable for urgent reports.",
          "This meets latency needs but is unnecessarily expensive for standard reports that don’t require real-time processing.",
          "Hourly batching further increases delay and cannot meet urgent processing requirements.",
          "This balances cost efficiency and latency requirements, ensuring urgent reports are processed quickly while optimizing cost for non-urgent ones."
        ],
        "difficulty": "easy"
      },
      {
        "id": "extraction-43",
        "question": "The extraction pipeline receives documents of varying types—some are invoices, others are contracts, and some are receipts. You've defined separate extraction tools, each with its own schema tailored to the document type. During testing, you observe that with tool_choice: \"auto\", Claude sometimes returns conversational text instead of calling an extraction tool, causing downstream parsing failures. You need guaranteed structured output without knowing the document type in advance. What's the most effective approach?",
        "choices": [
          "Consolidate all document types into a single unified-schema extraction tool and force that tool.",
          "Keep tool_choice: \"auto\" with system prompt instructions requiring tool use.",
          "Set tool_choice: \"any\" with all extraction tools defined.",
          "Add a preliminary classification call, then make a second call with tool_choice forced to the identified extraction tool."
        ],
        "correctIndex": 2,
        "explanation": "This guarantees that a tool will always be called, eliminating conversational text responses. While tool selection may not always be perfect, it ensures structured output every time, which is the primary requirement.",
        "choiceExplanations": [
          "This reduces extraction accuracy and creates an overly complex schema that doesn’t fit all document types well.",
          "Instructions alone are not enforceable, which is exactly why the issue occurs.",
          "This guarantees that a tool will always be called, eliminating conversational text responses. While tool selection may not always be perfect, it ensures structured output every time, which is the primary requirement.",
          "While more precise, this adds extra latency and complexity. The question prioritizes guaranteed structured output, which C achieves more directly."
        ],
        "difficulty": "hard"
      },
      {
        "id": "extraction-44",
        "question": "Monitoring shows 12% of extractions fall Pydantic validation with specific errors like \"expected float for quantity, got '2 to 3\". Retrying these requests without modification produces failures. What's the most effective approach to recover from these validation failures?",
        "choices": [
          "Set temperature to 0 to eliminate output variability and ensure consistent formatting",
          "Send a follow-up request including the validation error, asking the model to correct its output",
          "Pre-process source documents to standardize problematic formats before sending them for extraction",
          "Implement a secondary pipeline using a larger model tier to reprocess documents that fail validation"
        ],
        "correctIndex": 1,
        "explanation": "Providing specific validation feedback allows the model to correct the exact issue (e.g., convert “2 to 3” into a valid float), making recovery highly effective.",
        "choiceExplanations": [
          "This reduces randomness but won’t fix systematic extraction errors like misinterpreting ranges (“2 to 3”).",
          "Providing specific validation feedback allows the model to correct the exact issue (e.g., convert “2 to 3” into a valid float), making recovery highly effective.",
          "Helpful in some cases, but not scalable or sufficient for diverse real-world variations.",
          "More expensive and not necessary—targeted correction is more efficient and effective."
        ],
        "difficulty": "easy"
      },
      {
        "id": "extraction-69",
        "question": "Your document extraction tool uses ML models to extract invoice fields (vendor, amount, date). The models return confidence scores (0.0-1.0) for each extracted field. In production, you observe: (1) the agent proceeds with low-confidence extractions that are incorrect 23% of the time, and (2) the agent requests unnecessary human review for 31% of extractions that were actually correct. How should you restructure the tool's output?",
        "choices": [
          "Return fields with their raw confidence scores and add detailed few-shot examples to your system prompt demonstrating how to interpret different confidence ranges and when to request human review.",
          "Compute an aggregate extraction quality score across all fields and return it alongside the extracted values. Include a text summary describing the overall extraction reliability.",
          "Return fields with confidence scores, plus a requires_review boolean computed using your tested confidence thresholds, along with a review_reasons array explaining which fields triggered review.",
          "Return fields organized into verified and needs_verification objects based on confidence thresholds."
        ],
        "correctIndex": 2,
        "explanation": "This directly encodes decision logic into structured output, ensuring consistent behavior while still preserving explainability at the field level.",
        "choiceExplanations": [
          "This still leaves the decision logic ambiguous and pushes critical operational behavior into prompt interpretation, which is inconsistent and hard to control in production.",
          "A single aggregate score hides per-field uncertainty, which is exactly what is needed to avoid both false approvals and unnecessary reviews.",
          "This directly encodes decision logic into structured output, ensuring consistent behavior while still preserving explainability at the field level.",
          "This improves structure, but it hides the underlying confidence signals and reduces flexibility for downstream systems that may need finer-grained control or auditability."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-86",
        "question": "Evaluation shows 94% extraction accuracy on short meeting transcripts (<30 minutes) but only 68% on longer transcripts (>60 minutes) where discussions meander and key information is scattered throughout. Transcripts of both lengths fit within the model's context window. What pattern most effectively improves accuracy on complex, lengthy documents?",
        "choices": [
          "Add few-shot examples demonstrating correct extraction from lengthy meetings with scattered Information.",
          "Split lengthy transcripts Into chunks, extract from each chunk separately, then merge and deduplicate the results.",
          "Upgrade to a more capable model tier for the extraction task,",
          "Add a pre-extraction step where the model summarizes key discussions and conclusions before performing structured extraction."
        ],
        "correctIndex": 1,
        "explanation": "Chunking reduces cognitive load per extraction pass and improves recall of scattered details. Merging and deduplication then reconstruct the final structured output more reliably than processing the entire long transcript in one pass.",
        "choiceExplanations": [
          "Examples help somewhat, but they do not fundamentally solve the challenge of maintaining attention and consistency across long, meandering documents.",
          "Chunking reduces cognitive load per extraction pass and improves recall of scattered details. Merging and deduplication then reconstruct the final structured output more reliably than processing the entire long transcript in one pass.",
          "A stronger model may help marginally, but the core issue is long-document attention and information distribution, which chunking addresses more directly and efficiently.",
          "Summarization can omit details needed for extraction, especially when important information is scattered or mentioned briefly."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-87",
        "question": "Your system has been running for 3 weeks and human reviewers have corrected 847 extractions. Analysis reveals a recurring pattern: when recipes use informal measurements like \"a handful\" or \"a splash,\" the model either invents specific amounts or leaves fields empty—accounting for 23% of all corrections. How should you use this feedback to improve extraction accuracy?",
        "choices": [
          "Update your JSON schema to add a \"measurement_type\" enum field (precise/informal).",
          "Add few-shot examples to your prompt demonstrating correct handling of informal measurements— extracting them verbatim rather than converting or omitting them.",
          "Implement a post-processing layer that uses pattern matching to detect informal measurement phrases in source text and automatically populate values when the extraction is empty.",
          "Fine-tune the model on the 847 corrected extractions."
        ],
        "correctIndex": 1,
        "explanation": "This directly targets the observed failure mode by showing the model the desired behavior on real edge cases, improving consistency without forcing unsupported normalization.",
        "choiceExplanations": [
          "This may help classify outputs, but it does not teach the model how to correctly extract informal measurements instead of hallucinating or omitting them.",
          "This directly targets the observed failure mode by showing the model the desired behavior on real edge cases, improving consistency without forcing unsupported normalization.",
          "Pattern matching is brittle and does not address cases where the model invents incorrect quantities instead of leaving fields empty.",
          "Fine-tuning is expensive and unnecessary for a narrow, well-defined extraction issue that can be effectively corrected through targeted prompting examples. Key idea: use real correction data to create targeted few-shot examples that teach the desired extraction behavior on recurring edge cases."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-90",
        "question": "The system routes documents with extraction confidence below 85% to human review. A quarterly audit reveals that 12% of high-confidence extractions (>85%) also contain errors—cases where the model finds plausible-but-incorrect values. Error sources vary: comparison tables showing competitor specs, appendices referencing different product variants, and ambiguous phrasing the model misinterprets. You need a sustainable strategy to catch these high-confidence errors and measure whether improvements reduce the error rate over time. What approach is most effective?",
        "choices": [
          "Implement heuristic rules that flag documents containing comparison tables or appendices for review regardless of confidence score.",
          "Implement stratified random sampling reviewing a fixed percentage of high-confidence extractions weekly, enabling error rate measurement and novel pattern detection.",
          "Add a verification pass that re-extracts from each high-confidence document, flagging cases where the two extraction attempts produce different results.",
          "Lower the confidence threshold from 85% to 70%, routing a larger volume of extractions to human review."
        ],
        "correctIndex": 1,
        "explanation": "This is the most sustainable and statistically sound approach. It both: measures the true ongoing error rate in “trusted” outputs, and surfaces emerging failure patterns that confidence scores miss. It creates a continuous quality-monitoring feedback loop rather than patching isolated issues.",
        "choiceExplanations": [
          "This targets only currently known failure patterns and will miss new classes of high-confidence errors over time.",
          "This is the most sustainable and statistically sound approach. It both: measures the true ongoing error rate in “trusted” outputs, and surfaces emerging failure patterns that confidence scores miss. It creates a continuous quality-monitoring feedback loop rather than patching isolated issues.",
          "Useful for detecting instability, but repeated extraction can still confidently reproduce the same wrong answer.",
          "This increases operational cost dramatically without specifically addressing hidden high-confidence errors."
        ],
        "difficulty": "hard"
      },
      {
        "id": "extraction-91",
        "question": "Your extraction uses tool use with a JSON schema where property_type is defined as an enum: ['house', 'apartment', \"condo\", \"townhouse\"]. After deployment, 8% of extractions fall schema validation. Investigation reveals listings mention many uncommon property types—\"studio\", \"loft\", \"duplex\", \"mobile home\", \"tiny house\", \"converted warehouse\"—and new types continue appearing regularly. What's the most effective long-term solution?",
        "choices": [
          "Add an \"other\" value to your enum with a separate property_type_detail string field for specifics when \"other\" is selected.",
          "Change property_type from an enum to a free-form string and implement a normalization step in post-processing.",
          "Add few-shot examples to your prompt demonstrating how to map unexpected property types to the closest existing enum value.",
          "Continuously expand the enum to include newly observed property types and add monitoring for additional edge cases."
        ],
        "correctIndex": 0,
        "explanation": "This is the most robust long-term solution because it preserves schema validity while still allowing the system to capture new or uncommon property types without breaking validation. It also keeps structured consistency for downstream systems.",
        "choiceExplanations": [
          "This is the most robust long-term solution because it preserves schema validity while still allowing the system to capture new or uncommon property types without breaking validation. It also keeps structured consistency for downstream systems.",
          "This sacrifices schema control and pushes complexity downstream, increasing inconsistency and processing burden.",
          "This leads to forced misclassification and will not scale as new property types continue to appear.",
          "This is operationally expensive and does not scale in dynamic domains where new categories appear frequently."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-92",
        "question": "Your extraction system parses e-commerce product descriptions to extract specifications like dimensions, weight, and materials into JSON. Despite having a well-defined schema, the model inconsistently extracts the \"materials\" field—sometimes returning \"cotton blend\", other times \"Cotton/Polyester mix\", and occasionally omitting the field when material information is clearly present in the source. What's the most effective way to improve extraction consistency?",
        "choices": [
          "Set temperature to 0 to eliminate randomness and ensure deterministic outputs",
          "Switch to a more capable model tier since inconsistent extraction indicates insufficient model capability",
          "Make the \"materials\" field required instead of optional in the schema to force the model to always extract a value",
          "Add few-shot examples showing 2-3 complete Input-output pairs with standardized material description formats"
        ],
        "correctIndex": 3,
        "explanation": "This directly teaches the model the expected normalization pattern (e.g., “cotton blend” vs “cotton/polyester mix”) and when to consistently extract rather than omit, which is the core failure mode.",
        "choiceExplanations": [
          "Lower temperature improves consistency slightly, but it does not solve schema interpretation differences or missing-field behavior when the model is uncertain.",
          "This is not primarily a capability issue; the model already sees the information but is inconsistent in normalization and extraction behavior.",
          "Forcing requirement does not guarantee correctness; it often increases hallucination when the model tries to fill missing or ambiguous data.",
          "This directly teaches the model the expected normalization pattern (e.g., “cotton blend” vs “cotton/polyester mix”) and when to consistently extract rather than omit, which is the core failure mode."
        ],
        "difficulty": "hard"
      },
      {
        "id": "extraction-93",
        "question": "Documents arrive continuously throughout business hours and need structured data extracted. To reduce costs, you want to use the Message Batches API (50% discount, up-to-24-hour processing window). Your SLA specifies that extraction results must be available within 30 hours of document arrival with 99.9% reliability. Which batching strategy is most appropriate?",
        "choices": [
          "Submit batches every 4 hours containing documents from that window",
          "Submit batches every 6 hours containing documents from that window",
          "Submit a single batch at end of day containing all documents from that day",
          "Use the real-time API for all documents instead of batch processing"
        ],
        "correctIndex": 2,
        "explanation": "This is the most efficient strategy. With a 24-hour batch processing window, end-of-day batching still comfortably meets the 30-hour SLA while maximizing cost savings and operational simplicity.",
        "choiceExplanations": [
          "This is more frequent than necessary for a 30-hour SLA and reduces batching efficiency without improving reliability in a meaningful way.",
          "Still unnecessarily frequent; it increases operational overhead without providing measurable SLA benefits compared to less frequent batching.",
          "This is the most efficient strategy. With a 24-hour batch processing window, end-of-day batching still comfortably meets the 30-hour SLA while maximizing cost savings and operational simplicity.",
          "This guarantees speed but significantly increases cost and ignores the requirement to optimize for batch processing efficiency."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-94",
        "question": "Your extraction pipeline processes restaurant menus and must output structured JSON with fields for item names, descriptions, prices, and dietary tags. Some menus use inconsistent formatting—prices as \"$12\" vs \"12.00\", dietary info as icons vs text. What's the most reliable approach?",
        "choices": [
          "Extract data as-is and normalize formats in post-processing code after Claude returns.",
          "Define a strict output schema and include format normalization rules in your prompt.",
          "Use separate extraction calls for each field to ensure consistent handling of each type.",
          "Request multiple extraction attempts per document and select the most common format."
        ],
        "correctIndex": 1,
        "explanation": "This is the most reliable approach because it enforces structure through the schema while also guiding the model to normalize inconsistent inputs (like “$12” vs “12.00” and icon-based vs text-based dietary tags) at the point of extraction. That reduces downstream ambiguity and avoids relying on post-processing fixes. Why the others are not correct:",
        "choiceExplanations": [
          "This shifts complexity downstream and risks inconsistencies if extraction itself is already noisy or incomplete.",
          "This is the most reliable approach because it enforces structure through the schema while also guiding the model to normalize inconsistent inputs (like “$12” vs “12.00” and icon-based vs text-based dietary tags) at the point of extraction. That reduces downstream ambiguity and avoids relying on post-processing fixes. Why the others are not correct:",
          "This increases cost and latency and can introduce cross-field inconsistency instead of improving reliability.",
          "Majority voting does not guarantee correctness and is inefficient for structured extraction tasks."
        ],
        "difficulty": "easy"
      },
      {
        "id": "extraction-95",
        "question": "Your system extracts event metadata (date, location, organizer, attendee_count) from news articles using a JSON schema with all nullable fields. During evaluation, you observe the model frequently generates plausible but incorrect values for fields not mentioned in the article-for example, outputting \"500\" for attendee_count when the source contains no attendance information. What's the most effective way to reduce these false extractions?",
        "choices": [
          "Make all schema fleids required (non-nullable) with strict validation rules to ensure the model only outputs verifiable data.",
          "Add prompt instructions to return null for any field where information is not directly stated in the source.",
          "Upgrade to a more capable model tier with improved instruction-following to reduce hallucination tendencies.",
          "Add a post-processing step using a second LLM call to verify each extracted value exists in the source document."
        ],
        "correctIndex": 1,
        "explanation": "This directly targets the root failure mode (hallucinating absent fields). It enforces a clear extraction rule: only extract explicitly supported data, otherwise return null, which is the correct behavior for structured information extraction.",
        "choiceExplanations": [
          "Making fields required doesn’t prevent hallucination; it often makes it worse because the model is forced to invent values instead of leaving them blank.",
          "This directly targets the root failure mode (hallucinating absent fields). It enforces a clear extraction rule: only extract explicitly supported data, otherwise return null, which is the correct behavior for structured information extraction.",
          "A better model may reduce errors slightly, but the fundamental issue is missing extraction constraints, not model capability.",
          "This adds cost and latency and still relies on probabilistic verification rather than preventing hallucination at the source."
        ],
        "difficulty": "medium"
      },
      {
        "id": "extraction-118",
        "question": "The system processes product reviews using tool use with a defined schema: rating (integer 1-5), pros (string array), cons (string array), and overall_sentiment (enum: positive, negative, mixed). Testing reveals two issues with brief or ambiguous reviews (~20% of the dataset): (1) for reviews like \"Great product!\", Claude fabricates specific pros and cons rather than indicating this information isn't explicitly stated, and (2) for sarcastic reviews like \"Well that was... interesting\", Claude picks sentiment arbitrarily since there's no option for ambiguous cases. What schema modification best addresses both issues?",
        "choices": [
          "Add an extraction_confidence field (0.0-1.0) for each value, and filter outputs where any confidence falls below a threshold.",
          "Allow null values for pros/cons, and add \"unclear\" to the sentiment enum.",
          "Allow empty arrays for pros/cons as valid output, and add \"unclear\" to the sentiment enum.",
          "Make pros and cons optional fields, and add \"neutral\" and \"unclear\" to the sentiment enum."
        ],
        "correctIndex": 2,
        "explanation": "() This directly addresses both problems: For reviews like \"Great product!\", there may be no explicitly stated pros or cons. Allowing empty arrays lets the model accurately represent that no specific pros or cons were mentioned, instead of hallucinating details. For ambiguous or sarcastic reviews like \"Well that was... interesting\", adding \"unclear\" to the sentiment enum provides a valid option when sentiment cannot be determined reliably from the text.",
        "choiceExplanations": [
          "() Confidence scores do not solve the underlying schema problem. The model may still fabricate pros/cons or guess sentiment.",
          "() Null suggests the fields are missing rather than that no pros/cons were explicitly stated. Empty arrays more accurately represent \"none identified.\"",
          "() This directly addresses both problems: For reviews like \"Great product!\", there may be no explicitly stated pros or cons. Allowing empty arrays lets the model accurately represent that no specific pros or cons were mentioned, instead of hallucinating details. For ambiguous or sarcastic reviews like \"Well that was... interesting\", adding \"unclear\" to the sentiment enum provides a valid option when sentiment cannot be determined reliably from the text.",
          "() Optional fields can lead to inconsistent outputs. \"Neutral\" is different from \"unclear\" and does not address ambiguity in determining sentiment."
        ],
        "difficulty": "hard"
      },
      {
        "id": "extraction-119",
        "question": "After your daily batch of 10,000 documents completes, 300 documents (3%) failed with \"context_length_exceeded\" errors. The results file identifies each failure by custom_id. What's the most cost-effective approach to process these failures?",
        "choices": [
          "Reprocess the entire batch with prompt caching enabled to reduce the cost of retrying requests with identical system prompts",
          "Resubmit only the 300 failed documents after chunking them into smaller pieces, then combine the partial extractions",
          "Increase the max_tokens parameter for the 300 failed documents and resubmit them in a new batch",
          "Resubmit the entire 10,000 document batch using a model tier with a larger context window"
        ],
        "correctIndex": 1,
        "explanation": ". () The failures are specifically due to context_length_exceeded, meaning the documents are too large for the model's context window. The most cost-effective solution is to retry only the failed 300 documents, split them into smaller chunks that fit within context limits, and then merge the results. This avoids reprocessing the 9,700 documents that already succeeded.",
        "choiceExplanations": [
          "() Prompt caching may reduce costs, but it does not solve the context-length issue and unnecessarily reprocesses successful documents.",
          ". () The failures are specifically due to context_length_exceeded, meaning the documents are too large for the model's context window. The most cost-effective solution is to retry only the failed 300 documents, split them into smaller chunks that fit within context limits, and then merge the results. This avoids reprocessing the 9,700 documents that already succeeded.",
          "() max_tokens controls output length, not input context capacity. It will not resolve context_length_exceeded errors.",
          "() This is significantly more expensive and unnecessary when only 3% of documents failed."
        ],
        "difficulty": "easy"
      },
      {
        "id": "extraction-120",
        "question": "The system needs to extract candidate information (name, contact details, skills, work experience, education) from uploaded resumes. The extracted data must strictly conform to a predefined JSON schema, as missing required fields or incorrect data types will cause downstream validation failures. What is the most reliable approach to ensure Claude's output consistently matches the schema?",
        "choices": [
          "Define a tool with an input schema matching your required JSON structure and extract the data from Claude's tool_use response.",
          "Include detailed JSON formatting instructions and a template example in the system prompt, asking Claude to output only valid JSON.",
          "Parse Claude's text response with regex patterns to extract JSON objects, using retry logic for malformed responses.",
          "Make two separate API calls—first extracting information as text, then asking Claude to format that text as JSON."
        ],
        "correctIndex": 0,
        "explanation": "() Using tool use with a defined schema is the most reliable way to ensure the extracted candidate information conforms to the required JSON structure. The schema enforces field names, required properties, data types, and allowed values, significantly reducing validation failures and eliminating the need to parse free-form text.",
        "choiceExplanations": [
          "() Using tool use with a defined schema is the most reliable way to ensure the extracted candidate information conforms to the required JSON structure. The schema enforces field names, required properties, data types, and allowed values, significantly reducing validation failures and eliminating the need to parse free-form text.",
          "() Prompt instructions improve consistency but cannot guarantee strict schema compliance.",
          "() Regex-based parsing is brittle and does not ensure required fields or correct data types.",
          "() This adds complexity and still does not provide the schema enforcement that tool use offers.\\"
        ],
        "difficulty": "medium"
      }
    ]
  },
  {
    "id": "context",
    "name": "Context & Conversation Management",
    "description": "Managing token budgets, conversation history, persona consistency, and ambiguity over long multi-turn sessions.",
    "color": "#A78BFA",
    "icon": "chat",
    "order": 3,
    "questions": [
      {
        "id": "context-45",
        "question": "After three months of weekly sessions, your conversation history has grown to 85,000 tokens. When users ask \"What did we conclude about the theme of isolation?\", the assistant provides generic literary analysis rather than referencing the group's specific insights from earlier sessions. Discussions often build on previous meetings' conclusions, so maintaining narrative context is important. What's the most effective approach?",
        "choices": [
          "Add structured XML tags to mark significant discussion conclusions throughout the conversation history.",
          "Use semantic embedding to index the full conversation history and retrieve only relevant past exchanges for each user query, replacing the linear conversation format with retrieved segments.",
          "Implement rolling window truncation to keep only the most recent 25,000 tokens.",
          "Implement progressive summarization where older conversation blocks are replaced with concise summaries that explicitly extract key conclusions, decisions, and recurring themes, keeping recent exchanges verbatim."
        ],
        "correctIndex": 3,
        "explanation": "This preserves long-term context and key insights while staying within token limits, enabling the assistant to reference past conclusions effectively.",
        "choiceExplanations": [
          "Tagging helps organization, but it doesn’t solve the context length limitation or ensure relevant retrieval at query time.",
          "Powerful for retrieval, but replacing the conversation entirely loses narrative continuity, which is important for ongoing discussions.",
          "This discards earlier insights, which are critical for referencing past conclusions.",
          "This preserves long-term context and key insights while staying within token limits, enabling the assistant to reference past conclusions effectively."
        ],
        "difficulty": "medium"
      },
      {
        "id": "context-46",
        "question": "After a 40-minute session helping plan a dinner party, the conversation has grown to 78,000 tokens. The history includes: (1) the user mentioning a guest has a severe shellfish allergy, (2) measurements for scaling recipes to 8 servings, (3) the user's clarification that \"room temperature butter\" means 68°F in their kitchen, and (4) general back-and-forth about meal timing and presentation. You need to implement context management before the window limit is reached. What approach best balances information preservation with token reduction?",
        "choices": [
          "Summarize the entire conversation history into a concise summary capturing main topics discussed, then append new messages going forward.",
          "Implement a sliding window retaining only the most recent 20,000 tokens relying on users to re-state important information when relevant.",
          "Store the full conversation externally and use semantic search to retrieve relevant portions for each turn, loading only matching segments into context.",
          "Extract critical structured data (allergies, serving counts, user-defined terms) into a compact reference section, summarize general discussion, and retain recent exchanges verbatim."
        ],
        "correctIndex": 3,
        "explanation": "This preserves high-priority facts exactly, reduces tokens efficiently, and maintains conversational continuity.",
        "choiceExplanations": [
          "This risks losing critical details like allergies and precise measurements that must remain exact.",
          "This discards essential context (e.g., allergy info), which is unsafe and unreliable.",
          "Helpful for retrieval, but may miss important persistent constraints (like allergies) if not explicitly retrieved every time.",
          "This preserves high-priority facts exactly, reduces tokens efficiently, and maintains conversational continuity."
        ],
        "difficulty": "hard"
      },
      {
        "id": "context-47",
        "question": "You're Implementing a feature where users refine their playlist preferences through multiple conversation turns. After deploying, you notice Claude's responses don't reflect what us earlier in the same conversation—for example, a user says they love jazz, but two messages later Claude asks what genres they enjoy. What is the most likely cause?",
        "choices": [
          "The model's context window has been exceeded by the conversation length",
          "The Claude API requires a session_id parameter that you haven't configured",
          "Claude requires a vector database connection to maintain conversation memory",
          "Your application isn't including prior messages in the messages array"
        ],
        "correctIndex": 3,
        "explanation": "Claude does not retain memory between calls—if previous messages aren’t included, it cannot recall earlier user preferences.",
        "choiceExplanations": [
          "This would only happen in very long conversations, and the issue appears early within just a few turns.",
          "There is no required session_id—context must be explicitly managed by the application.",
          "A vector database is optional for retrieval, not required for basic conversation memory.",
          "Claude does not retain memory between calls—if previous messages aren’t included, it cannot recall earlier user preferences."
        ],
        "difficulty": "medium"
      },
      {
        "id": "context-48",
        "question": "Your fitness coaching assistant uses a system prompt with detailed conditional logic: \"If the user mentions being a beginner, provide step-by-step form instructions. If they use term 'progressive overload' or 'superset', respond concisely. If they ask about injury history, always recommend consulting a physician.\" During evaluation, you find the assistant correct explicit expertise declarations but struggles when users don't clearly state their level-often defaulting to overly detailed responses regardless of contextual cues like technical te Which change to the system prompt would most directly address this failure to pick up on implicit expertise signals?",
        "choices": [
          "Replace most conditionals with a general principle: \"Adapt explanation depth to match user expertise, mirroring their terminology.\" Keep only the safety-critical conditional abou consultations.",
          "Add more conditional branches to cover additional expertise signals, such as \"If user mentions specific rep ranges or asks about periodization, treat as advanced.\"",
          "Implement a pre-conversation intake that asks users to rate their experience level, then inject that rating into the system prompt as context for all subsequent responses.",
          "Add an explicit instruction for the model to ask a clarifying question about experience level whenever the user's expertise isn't immediately clear from their first message."
        ],
        "correctIndex": 0,
        "explanation": "This shifts from brittle rule-based logic to a flexible heuristic, enabling the model to infer expertise from subtle cues like terminology and tone.",
        "choiceExplanations": [
          "This shifts from brittle rule-based logic to a flexible heuristic, enabling the model to infer expertise from subtle cues like terminology and tone.",
          "This increases complexity and brittleness—edge cases will still be missed.",
          "Useful, but doesn’t solve the issue of interpreting implicit signals during conversation.",
          "This adds friction and interrupts flow instead of improving implicit understanding."
        ],
        "difficulty": "hard"
      },
      {
        "id": "context-49",
        "question": "During initial testing, you notice that Claude doesn't seem to remember vocabulary words from earlier in the conversation. When a student asks \"Can you quiz me on those words?\", responds as if no words have been discussed. What is the most likely explanation?",
        "choices": [
          "Your system prompt needs explicit instructions telling Claude to remember information from earlier turns.",
          "You're not including prior messages in each API request—the stateless API doesn't retain conversation history.",
          "You need to enable conversation persistence by passing a session ID parameter with each API call.",
          "The model's context window has filled up, causing earlier conversation content to be dropped."
        ],
        "correctIndex": 1,
        "explanation": "Claude is stateless. If earlier messages aren’t passed in the request, it has no awareness of prior vocabulary.",
        "choiceExplanations": [
          "Instructions alone don’t give the model memory—context must be provided with each request.",
          "Claude is stateless. If earlier messages aren’t passed in the request, it has no awareness of prior vocabulary.",
          "There’s no required session ID—memory is handled by including past messages.",
          "This would only happen in very long conversations, not typical early testing scenarios."
        ],
        "difficulty": "easy"
      },
      {
        "id": "context-50",
        "question": "Your home renovation planning assistant uses a system prompt defining an expert contractor persona with specific guidelines: always ask about budget, suggest alternatives at multiple price points, and confirm timeline requirements. During testing, responses follow these guidelines for turns 1-4, but by turn 7, the assistant gives generic advice without asking about budget or timeline. The conversation totals only 2,500 tokens. What is the most likely cause?",
        "choices": [
          "System prompts only establish initial behavior and don't persist across all turns.",
          "The system prompt is only sent with the first API request.",
          "The assistant's accumulated responses are diluting the system prompt's influence.",
          "The model's attention on system prompt instructions naturally weakens as turns accumulate."
        ],
        "correctIndex": 2,
        "explanation": "As the conversation grows, the model must balance more context. Even within a small token count, recent conversational patterns can outweigh earlier instructions, causing drift from the original system prompt.",
        "choiceExplanations": [
          "System prompts do persist as long as they are included in each request.",
          "If this were the case, the behavior would degrade immediately after the first turn—not gradually by turn 7.",
          "As the conversation grows, the model must balance more context. Even within a small token count, recent conversational patterns can outweigh earlier instructions, causing drift from the original system prompt.",
          "This is too vague—it's not just “natural weakening,” but specifically the increasing influence of conversational context relative to the system prompt."
        ],
        "difficulty": "medium"
      },
      {
        "id": "context-51",
        "question": "Users report that during extended conversations, the AI loses track of specific topics, examples, and preferences they mentioned earlier in the session. Your current implementation uses a sliding window that keeps only the most recent 25 message pairs to stay within context limits. What's the most effective approach to maintain awareness of earlier conversation content while managing context size?",
        "choices": [
          "Replace the sliding window with a hybrid approach: summarize older messages while keeping recent messages verbatim.",
          "Implement vector similarity search over the full conversation history, retrieving relevant past messages for each user query.",
          "Increase the window size to 50 message pairs to retain more conversation history before truncation.",
          "Add a separate API call each turn to summarize messages being dropped, prepending this running summary to the conversation."
        ],
        "correctIndex": 0,
        "explanation": "This preserves long-term context in a compressed form while keeping recent interactions intact, maintaining continuity without exceeding token limits.",
        "choiceExplanations": [
          "This preserves long-term context in a compressed form while keeping recent interactions intact, maintaining continuity without exceeding token limits.",
          "While powerful, this is more complex and better suited for large-scale or cross-session retrieval, not necessarily the most direct fix for in-session context loss.",
          "This only delays the issue and increases token usage without fundamentally solving it.",
          "This can lead to summary drift and compounding errors, reducing reliability over time."
        ],
        "difficulty": "medium"
      },
      {
        "id": "context-52",
        "question": "Users frequently send ambiguous requests like \"book a venue for the party\" without specifying date, guest count, or budget. Your evaluation shows the assistant asks an average of 4 questions before taking any action, causing 35% of users to abandon mid-conversation. However, when you reduce questions, users sometimes receive recommendations that don't preferences. What's the most effective approach to improve this trade-off?",
        "choices": [
          "Implement a structured intake form that collects all required parameters (date, guest count, budget, venue type) upfront before the assistant begins providing any recommendation",
          "Configure the assistant to proceed with reasonable defaults (medium sized venue, next weekend, moderate budget) without explicitly stating these assumptions, allowing users to corrections if results don't match expectations",
          "Instruct the assistant to state explicit assumptions based on conversation status proceed with recommendations while inviting corrections, and reserve clarifying questions only Irreversible actions like confirming bookings.",
          "Configure the assistant to consolidate all clarifying questions into a single compound question (e.g., \"What date, guest count, and budget are you considering?\") to reduce the total"
        ],
        "correctIndex": 2,
        "explanation": "This balances speed and accuracy—users get immediate value, assumptions are transparent, and friction is minimized.",
        "choiceExplanations": [
          "This ensures completeness but adds high friction, increasing drop-off before any value is delivered.",
          "Hidden assumptions can lead to misalignment and confusion, reducing trust.",
          "This balances speed and accuracy—users get immediate value, assumptions are transparent, and friction is minimized.",
          "This reduces question count but still creates front-loaded friction without delivering immediate value."
        ],
        "difficulty": "medium"
      },
      {
        "id": "context-53",
        "question": "During QA testing, you notice that Claude follows your system prompt guidelines consistently in the first 10-15 turns, but by turn 25-30, responses begin deviating—using informal tone when formality was specified, occasionally skipping required formatting, or providing information types the guidelines restrict. Conversation length is well within context limits (typically 30,000 tokens out of 200,000 available). What's the most effective approach to maintain consistent behavior throughout extended conversations?",
        "choices": [
          "Insert user-role messages that reinforce critical guidelines at natural conversation breakpoints, especially before complex requests.",
          "Implement post-response validation that regenerates each response until it conforms to the specified guidelines.",
          "Automatically start a new conversation after 20 turns, passing a summary of the prior context to maintain continuity.",
          "Move behavioral guidelines from the system prompt into the first user message."
        ],
        "correctIndex": 0,
        "explanation": "This combats instruction drift by periodically refreshing key constraints within the active context, keeping behavior aligned over long conversations.",
        "choiceExplanations": [
          "This combats instruction drift by periodically refreshing key constraints within the active context, keeping behavior aligned over long conversations.",
          "This is costly and reactive, and can create loops without addressing the root cause of drift.",
          "Summarization can lose detail and doesn’t directly reinforce behavioral rules.",
          "User messages carry less weight than system prompts and are more likely to be overridden during the conversation."
        ],
        "difficulty": "hard"
      },
      {
        "id": "context-54",
        "question": "Performance analysis reveals your context is composed of accumulated RAG results from all previous queries, which is crowding out conversation history and causing coherence degradation after 15+ turns. Which approach best addresses this issue?",
        "choices": [
          "Implement semantic deduplication to identify and remove redundant information across the accumulated RAG results and conversation turns",
          "Implement a sliding window for RAG results from the last 2-3 queries while preserving conversation history",
          "Shift context budget to favor RAG results while reducing conversation history allocation",
          "Compress all RAG results into a consolidated summary document that updates incrementally after each retrieval"
        ],
        "correctIndex": 1,
        "explanation": "This directly addresses context crowding by limiting RAG growth while keeping conversation continuity intact.",
        "choiceExplanations": [
          "This reduces redundancy but doesn’t solve the core issue of unbounded accumulation of RAG context.",
          "This directly addresses context crowding by limiting RAG growth while keeping conversation continuity intact.",
          "This worsens coherence by sacrificing conversation context.",
          "This can introduce information loss and summary drift, especially across many turns."
        ],
        "difficulty": "easy"
      },
      {
        "id": "context-55",
        "question": "Your music discovery assistant should consistently maintain an enthusiastic tone, explain its reasoning for each recommendation, and ask clarifying questions to better understand user preferences. You want this behavior to persist reliably across all user interactions. Where should you define these behavioral guidelines?",
        "choices": [
          "In the first assistant message, instructing Claude to follow these guidelines going forward",
          "Prepended to each user message before sending to the API",
          "In the system prompt",
          "In environmental variables that your application passes to the API client"
        ],
        "correctIndex": 2,
        "explanation": "The system prompt is the highest-priority instruction layer, making it the most reliable place to enforce consistent tone, reasoning style, and questioning behavior.",
        "choiceExplanations": [
          "Assistant messages don’t reliably control future behavior and can be overridden by later context.",
          "User messages carry less authority than system-level instructions and are less reliable for enforcing behavior.",
          "The system prompt is the highest-priority instruction layer, making it the most reliable place to enforce consistent tone, reasoning style, and questioning behavior.",
          "Environment variables are not part of the model’s context and have no effect on behavior unless explicitly included in the prompt."
        ],
        "difficulty": "easy"
      },
      {
        "id": "context-56",
        "question": "During a conversation about order tracking, your external system receives a webhook indicating the user's package has shipped. The user is actively chatting and will likely send a follow-up message soon. You want the assistant to naturally incorporate this status change in its next response. What's the most effective approach?",
        "choices": [
          "Immediately send an API request with the update as a synthetic user message, generating an unsolicited assistant response.",
          "Append the status update as a prefix to the next user message before calling the API.",
          "Configure the assistant to call a get_order_status tool at the start of every response.",
          "Add the current shipping status to the system prompt before the next API call."
        ],
        "correctIndex": 3,
        "explanation": "This cleanly injects up-to-date system state into context, allowing the assistant to naturally incorporate it into the next response without disrupting the conversation flow.",
        "choiceExplanations": [
          "This creates an unsolicited interruption, which can feel unnatural and confusing in an active conversation.",
          "This pollutes the user message and mixes system state with user intent, which can lead to misinterpretation.",
          "This is inefficient and unnecessary, especially when you already have the update via webhook.",
          "This cleanly injects up-to-date system state into context, allowing the assistant to naturally incorporate it into the next response without disrupting the conversation flow."
        ],
        "difficulty": "easy"
      },
      {
        "id": "context-57",
        "question": "A new user's first message is \"Set up my focus music,\" This could mean configure preferences, create a playlist, or play music immediately. Your system supports all three actions. What's the effective approach?",
        "choices": [
          "Create a new \"Focus\" playlist with curated tracks and notify the user it's ready.",
          "Ask one clarifying question about action type: play now or configure for later",
          "Play popular focus tracks Immediately and let the user redirect if needed",
          "Start preference configuration by asking about genres, temps, and artists they prefer for focus."
        ],
        "correctIndex": 1,
        "explanation": "This minimizes friction while resolving ambiguity, enabling the assistant to take the right action quickly.",
        "choiceExplanations": [
          "This assumes intent and may do the wrong action, frustrating users.",
          "This minimizes friction while resolving ambiguity, enabling the assistant to take the right action quickly.",
          "Acts prematurely and may not match user intent.",
          "Too heavy upfront—adds unnecessary friction before confirming intent."
        ],
        "difficulty": "easy"
      },
      {
        "id": "context-58",
        "question": "Users report that responses feel repetitive across turns—each message begins with phrases like \"Certainly!\" or \"I'd be happy to help!\" even deep into conversations. You want responses to feel more natural, without these repetitive openers. What's the most effective approach?",
        "choices": [
          "Implement post-processing to detect and strip common greeting phrases from response beginnings",
          "Add system prompt instructions specifying phrases to avoid, such as \"Never begin responses with 'Certainly' or similar affirmations\"",
          "Lower the temperature parameter to make response openings more deterministic and less variable",
          "Append a partial assistant message with a direct response opening that the model will continue from"
        ],
        "correctIndex": 3,
        "explanation": ". This technique, often referred to as \"Pre-filling\" or \"Response Steering,\" is a powerful way to control the style and tone of an LLM. By providing the first few words of the assistant's response in the API call, you force the model to continue from that point, bypassing its internal \"politeness\" training or RLHF-induced habit of starting every turn with a greeting.",
        "choiceExplanations": [
          "This does not address the core issue in the scenario as directly as the correct answer.",
          "This does not address the core issue in the scenario as directly as the correct answer.",
          "This does not address the core issue in the scenario as directly as the correct answer.",
          ". This technique, often referred to as \"Pre-filling\" or \"Response Steering,\" is a powerful way to control the style and tone of an LLM. By providing the first few words of the assistant's response in the API call, you force the model to continue from that point, bypassing its internal \"politeness\" training or RLHF-induced habit of starting every turn with a greeting."
        ],
        "difficulty": "easy"
      },
      {
        "id": "context-59",
        "question": "Users frequently send ambiguous requests like \"book a venue for the party\" without specifying date, guest count, or budget. Your evaluation shows the assistant asks an average of 4 questions before taking any action, causing 35% of users to abandon mid-conversation. However, when you reduce questions, users sometimes receive recommendations that don't preferences. What's the most effective approach to improve this trade-off?",
        "choices": [
          "Implement a structured intake form that collects all required parameters (date, guest count, budget, venue type) upfront before the assistant begins providing any recommendation",
          "Configure the assistant to proceed with reasonable defaults (medium sized venue, next weekend, moderate budget) without explicitly stating these assumptions, allowing users to corrections if results don't match expectations",
          "Instruct the assistant to state explicit assumptions based on conversation status proceed with recommendations while inviting corrections, and reserve clarifying questions only Irreversible actions like confirming bookings.",
          "Configure the assistant to consolidate all clarifying questions into a single compound question (e.g., \"What date, guest count, and budget are you considering?\") to reduce the total"
        ],
        "correctIndex": 2,
        "explanation": "This balances speed and accuracy—users get immediate value, assumptions are transparent, and friction is minimized.",
        "choiceExplanations": [
          "This ensures completeness but adds high friction, increasing drop-off before any value is delivered.",
          "Hidden assumptions can lead to misalignment and confusion, reducing trust.",
          "This balances speed and accuracy—users get immediate value, assumptions are transparent, and friction is minimized.",
          "This reduces question count but still creates front-loaded friction without delivering immediate value."
        ],
        "difficulty": "medium"
      },
      {
        "id": "context-72",
        "question": "Your conversation history includes two types of content: persistent story elements (character backgrounds, plot structure, world rules) that must remain consistent throughout, and extensive brainstorming discussion that's mostly ephemeral. After 40+ turns, you're hitting context limits and users report the assistant \"forgets\" established character traits, breaking narrative consistency. Which approach best ensures persistent story elements remain available to the model while reclaiming context space?",
        "choices": [
          "Separate persistent story elements into a retained \"story bible\" section at context start, applying trimming or summarization only to brainstorming discussion.",
          "Store all history in a vector database and retrieve semantically similar passages for each new message, replacing conversation history with retrieved chunks.",
          "Apply a sliding-window approach keeping only the most recent 25 turns, relying on the model to infer earlier context from recent discussion flow.",
          "Summarize the entire conversation history into a condensed synopsis every 20 turns, replacing the full history to free up tokens."
        ],
        "correctIndex": 0,
        "explanation": "This directly solves the problem by preserving high-value, invariant narrative constraints (characters, rules, canon) while allowing lower-value conversational content to be compressed. It maintains continuity without losing essential story logic.",
        "choiceExplanations": [
          "This directly solves the problem by preserving high-value, invariant narrative constraints (characters, rules, canon) while allowing lower-value conversational content to be compressed. It maintains continuity without losing essential story logic.",
          "This risks missing globally important story rules because retrieval is similarity-based, not constraint-aware. Core canon details may not always be retrieved.",
          "This will almost certainly break long-range consistency, since key character and world rules will be dropped.",
          "General summarization tends to lose fine-grained canonical details, which are exactly what must remain stable for narrative consistency."
        ],
        "difficulty": "hard"
      },
      {
        "id": "context-73",
        "question": "Your conversational assistant frequently generates multiple clarifying questions when users make ambiguous requests. When a user asks \"Can you help me with the report?\", the assistant responds: \"I'd be happy to help! Could you tell me: 1) Which report? 2) What kind of help—drafting, reviewing, or formatting? 3) What's your deadline?\" User analytics show a 40% conversation abandonment rate after these multi-question responses. What's the most effective way to reduce friction while appropriately handling ambiguity?",
        "choices": [
          "Limit the assistant to one clarifying question per turn, using conversation history to accumulate answers over multiple exchanges rather than requesting everything upfront.",
          "Modify the system prompt to instruct the assistant to make reasonable assumptions from available context, state those assumptions explicitly, and offer to adjust if the interpretation is wrong.",
          "Add a preprocessing step using a smaller model to classify request ambiguity on a 1-5 scale, routing high-ambiguity requests to a clarification dialog and low-ambiguity requests directly to the assistant.",
          "Create a lookup table of common request patterns with predefined default interpretations, having the assistant respond with those defaults without stating the assumptions made."
        ],
        "correctIndex": 1,
        "explanation": "This best balances usability and accuracy: the assistant provides immediate value, avoids overload of questions, and maintains transparency so users can correct assumptions quickly if needed.",
        "choiceExplanations": [
          "This reduces immediate friction, but it can make resolution slower and still prolong ambiguity across multiple turns, potentially frustrating users who want faster outcomes.",
          "This best balances usability and accuracy: the assistant provides immediate value, avoids overload of questions, and maintains transparency so users can correct assumptions quickly if needed.",
          "This adds system complexity and still risks unnecessary gating or misclassification, increasing friction or incorrect routing.",
          "Hidden assumptions reduce trust and can lead to incorrect outputs without user awareness or correction."
        ],
        "difficulty": "hard"
      },
      {
        "id": "context-74",
        "question": "Users frequently refine their search criteria mid-conversation. You notice a pattern: when users say things like \"Actually, let's raise the budget to $650K\" or \"I'd prefer a condo now instead of a house,\" the assistant sometimes continues referencing the original preferences in later responses—even though the updates are clearly present in the conversation history. Context usage is only at 35% capacity. Which solution most reliably ensures the model uses the current preferences?",
        "choices": [
          "Maintain a structured state object with current preferences, update it on changes, and include it in each request.",
          "Implement conversation pruning to remove turns containing outdated preferences, ensuring only current ones remain in context.",
          "Include few-shot examples showing the assistant correctly acknowledging and applying preference changes in responses.",
          "Add system prompt instructions emphasizing that the model should always prioritize the most recently stated preferences over earlier ones."
        ],
        "correctIndex": 0,
        "explanation": "This is the most reliable solution because it externalizes “truth” into a single authoritative state, preventing the model from having to infer which preference is current across many turns.",
        "choiceExplanations": [
          "This is the most reliable solution because it externalizes “truth” into a single authoritative state, preventing the model from having to infer which preference is current across many turns.",
          "Pruning is risky because earlier messages may still contain important constraints or rationale; removing them can break continuity and lead to unintended loss of context.",
          "Examples help behavior, but they do not guarantee consistent override of earlier conflicting context in long conversations.",
          "This is helpful but not reliable enough on its own—models can still misinterpret or fail to consistently resolve conflicts without a structured state."
        ],
        "difficulty": "hard"
      },
      {
        "id": "context-75",
        "question": "Your conversational AI tutor has a 2,800-token system prompt containing teaching methodology, persona guidelines, and detailed written instructions for adapting explanations to different proficiency levels. User testing reveals that in conversations exceeding 12 turns (approximately 4,000 tokens of conversation history), the assistant increasingly ignores the proficiency-adaptation guidelines, defaulting to intermediate-level explanations regardless of the learner's stated level. What's the most effective approach to ensure consistent adherence to these guidelines throughout extended conversations?",
        "choices": [
          "Inject a condensed reminder of the proficiency requirements into the conversation as a system message every 4-5 turns.",
          "Replace the verbose proficiency guidelines with few-shot examples demonstrating appropriate responses at each proficiency level, showing concrete differences in vocabulary, complexity, and explanation depth.",
          "Restructure the system prompt to place the proficiency-adaptation rules in a clearly-marked final section immediately before the conversation history begins.",
          "After each assistant response, make a separate API call to evaluate whether the difficulty level matched the learner's profile, regenerating responses that don't align."
        ],
        "correctIndex": 1,
        "explanation": "This is the most effective fix because few-shot examples strongly anchor behavior. Instead of relying on long, abstract instructions that degrade in influence over long contexts, the model gets clear behavioral patterns it can consistently imitate, improving adherence across extended conversations.",
        "choiceExplanations": [
          "This is a mitigation strategy, but it’s operationally inefficient and still treats the symptom (drift over long context) rather than improving how the model reliably learns and applies the rule in the first place.",
          "This is the most effective fix because few-shot examples strongly anchor behavior. Instead of relying on long, abstract instructions that degrade in influence over long contexts, the model gets clear behavioral patterns it can consistently imitate, improving adherence across extended conversations.",
          "This can slightly improve recall but does not address the core weakness of long, abstract rule blocks losing effectiveness over time.",
          "This is expensive, slow, and unnecessary when prompt design improvements can solve the issue."
        ],
        "difficulty": "hard"
      },
      {
        "id": "context-76",
        "question": "After deploying an updated system prompt that improves response quality, users with multi-session conversations spanning several weeks report that the assistant now contradicts its earlier statements and has a noticeably different communication style. New users don't experience these issues. What's the best approach to resolve this?",
        "choices": [
          "Regenerate summaries of existing conversations using the new prompt and replace the stored histories to align past context with current behavior.",
          "Add a transition message when sessions resume explaining that the assistant has been updated and behavior may differ.",
          "Version system prompts and associate each conversation with the prompt version under which it started, applying updates only to new conversations.",
          "Add instructions to the new system prompt directing the assistant to maintain consistency with any prior statements in the conversation history."
        ],
        "correctIndex": 2,
        "explanation": "This is the most robust solution because it preserves behavioral consistency within a conversation over time, avoiding contradictions caused by mid-stream prompt changes.",
        "choiceExplanations": [
          "This rewrites history and can distort or erase what users actually said, creating continuity risks and potential inaccuracies.",
          "This improves transparency but does not solve the core problem of inconsistent behavior across sessions.",
          "This is the most robust solution because it preserves behavioral consistency within a conversation over time, avoiding contradictions caused by mid-stream prompt changes.",
          "This helps slightly, but it cannot reliably override changes in underlying behavior introduced by prompt updates."
        ],
        "difficulty": "easy"
      },
      {
        "id": "context-96",
        "question": "Your research assistant helps users analyze academic papers over extended conversations. User testing reveals a recurring issue: after conversations exceed 60K tokens, users ask follow-up questions requiring precise numerical details from papers discussed earlier—sample sizes, exact p-values, specific inclusion criteria. Your current approach summarizes paper discussions after 8 turns to stay within context limits. Users report that responses to these precision-dependent questions are often hedged or inaccurate. What's the most effective architectural change?",
        "choices": [
          "Implement retrieval that re-injects relevant paper sections when the user's question suggests they need specific numerical details.",
          "Maintain a structured database of key facts extracted from each paper (sample sizes, statistics, methods) and retrieve relevant entries into context when precision-dependent questions are detected.",
          "Keep source text from methodology and results sections in context permanently, while summarizing only the conversational discussion and interpretation portions.",
          "Use a separate Claude call with explicit instructions to generate higher-fidelity summaries that preserve all numerical details and statistical values."
        ],
        "correctIndex": 1,
        "explanation": "This is the most effective architectural change. It separates stable factual data (structured facts store) from conversational history, ensuring that precise values like p-values and sample sizes remain accessible even after summarization or long-context drift.",
        "choiceExplanations": [
          "This helps, but it is reactive and depends on correct detection at query time; it doesn’t ensure consistent availability of critical structured facts across the session.",
          "This is the most effective architectural change. It separates stable factual data (structured facts store) from conversational history, ensuring that precise values like p-values and sample sizes remain accessible even after summarization or long-context drift.",
          "This is inefficient and quickly exhausts context window limits, especially across many papers.",
          "Even high-fidelity summaries can introduce omission or distortion; it is not as reliable as structured fact extraction and storage."
        ],
        "difficulty": "hard"
      },
      {
        "id": "context-97",
        "question": "Your fitness coaching assistant uses a system prompt with detailed conditional logic: \"If the user mentions being a beginner, provide step-by-step form instructions. If they use terms like 'progressive overload' or 'superset', respond concisely. If they ask about injury history, always recommend consulting a physician.\" During evaluation, you find the assistant correctly adapts to explicit expertise declarations but struggles when users don't clearly state their level—often defaulting to overly detailed responses regardless of contextual cues like technical terminology. Which change to the system prompt would most directly address this failure to pick up on implicit expertise signals?",
        "choices": [
          "Add an explicit instruction for the model to ask a clarifying question about experience level whenever the user's expertise isn't immediately clear from their first message.",
          "Replace most conditionals with a general principle: \"Adapt explanation depth to match user expertise, mirroring their terminology.\" Keep only the safety-critical conditional about injury consultations.",
          "Implement a pre-conversation intake that asks users to rate their experience level, then inject that rating into the system prompt as context for all subsequent responses.",
          "Add more conditional branches to cover additional expertise signals, such as \"If user mentions specific rep ranges or asks about periodization, treat as advanced.\""
        ],
        "correctIndex": 1,
        "explanation": "This directly fixes the core issue: over-reliance on brittle rules. A general adaptive principle allows the model to infer expertise from implicit signals (terminology, phrasing, specificity) instead of only explicit declarations.",
        "choiceExplanations": [
          "This reduces responsiveness and forces unnecessary clarification questions, even when the model could reasonably infer expertise from context.",
          "This directly fixes the core issue: over-reliance on brittle rules. A general adaptive principle allows the model to infer expertise from implicit signals (terminology, phrasing, specificity) instead of only explicit declarations.",
          "This improves clarity but adds friction and fails when users provide inaccurate or inconsistent self-assessments.",
          "This increases prompt complexity and still won’t scale to the full range of implicit cues users naturally express."
        ],
        "difficulty": "hard"
      }
    ]
  },
  {
    "id": "orchestration",
    "name": "Multi-Agent Orchestration",
    "description": "Coordinator/subagent architectures, research pipelines, state handoff, and parallelization patterns.",
    "color": "#60A5FA",
    "icon": "network",
    "order": 4,
    "questions": [
      {
        "id": "orchestration-1",
        "question": "After the web search agent and document analysis agent complete their tasks, the coordinator invokes the synthesis agent. However, the synthesis agent responds that it cannot complete the task because no research findings were provided. What is the most likely cause of this issue?",
        "choices": [
          "The synthesis agent needs tools that can fetch results directly from the other agents' conversation histories.",
          "The synthesis agent's context window is not large enough to hold the combined outputs from both previous agents.",
          "The subagents need to share a single API connection to enable automatic context sharing between invocations.",
          "The coordinator did not include the outputs from the previous agents in the synthesis agent's prompt."
        ],
        "correctIndex": 3,
        "explanation": "The synthesis agent can only act on the information provided in its prompt. If prior outputs are not passed, it will report missing research findings.",
        "choiceExplanations": [
          "Agents do not require direct access to each other’s histories. Proper orchestration passes outputs explicitly via prompts.",
          "If this were the issue, the agent would receive truncated data, not no data at all. The error indicates missing inputs entirely.",
          "Agent communication does not depend on shared API connections. Context must be explicitly passed by the coordinator.",
          "The synthesis agent can only act on the information provided in its prompt. If prior outputs are not passed, it will report missing research findings."
        ],
        "difficulty": "easy"
      },
      {
        "id": "orchestration-2",
        "question": "When researching \"renewable energy adoption,\" the web search agent returns recent statistics (2024: 35% adoption) while the document analysis agent extracts data from internal reports (2022: 18% adoption). The synthesis agent incorrectly flags these as contradictory sources rather than recognizing the data shows growth over time. What change would best enable the synthesis agent to correctly interpret such temporal differences?",
        "choices": [
          "Require subagents to include publication or data collection dates in their structured outputs.",
          "Instruct the synthesis agent to always treat the most recent data as authoritative and place older findings in a separate historical appendix.",
          "Add a conflict resolution agent that automatically discards older data when newer data exists for the same metric.",
          "Configure the web search agent to only return results from the past 6 months"
        ],
        "correctIndex": 0,
        "explanation": "Providing timestamps allows the synthesis agent to understand that the figures refer to different points in time, enabling it to interpret the data as a trend (growth) rather than a contradiction.",
        "choiceExplanations": [
          "Providing timestamps allows the synthesis agent to understand that the figures refer to different points in time, enabling it to interpret the data as a trend (growth) rather than a contradiction.",
          "This approach hides useful context and does not help the agent understand relationships between data points over time.",
          "Discarding older data removes valuable historical insight and prevents trend analysis.",
          ". Limiting recency reduces context and does not address the core issue of interpreting time-based differences."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-3",
        "question": "Users report that final reports sometimes lack depth on specific subtopics. Investigation shows that the document analysis agent frequently identifies gaps—for instance, noting \"the retrieved sources discuss API authentication but lack details on token refresh patterns\"—but under the current strict pipeline, this insight isn't actionable since search has already completed. What is the most effective architectural change?",
        "choices": [
          "Have the analysis agent report specific gaps to the coordinator, which triggers targeted searches and re-invokes analysis until sufficient.",
          "Add a research planning agent before the search phase that decomposes topics into specific sub-questions.",
          "Have the synthesis agent attach confidence scores to each section and flag areas with insufficient coverage for manual review.",
          "Have the coordinator review analysis output for gap indicators and re-invoke search with gap-informed queries when gaps are detected."
        ],
        "correctIndex": 0,
        "explanation": "This introduces a dynamic, agentic loop (or reflection pattern) into the workflow. Instead of a rigid, linear pipeline where steps cannot be retraced, the system can now adapt based on what it discovers. The Analysis Agent is the Expert: The document analysis agent is the one actively reading the text and identifying exactly what is missing (e.g., \"missing token refresh patterns\"). The Coordinator Manages the Flow: By reporting these specific gaps back to the coordinator, the coordinator can intelligently route the workflow back to the search agent with a highly targeted query, then pass the new findings back to the analysis agent to close the loop.",
        "choiceExplanations": [
          "This introduces a dynamic, agentic loop (or reflection pattern) into the workflow. Instead of a rigid, linear pipeline where steps cannot be retraced, the system can now adapt based on what it discovers. The Analysis Agent is the Expert: The document analysis agent is the one actively reading the text and identifying exactly what is missing (e.g., \"missing token refresh patterns\"). The Coordinator Manages the Flow: By reporting these specific gaps back to the coordinator, the coordinator can intelligently route the workflow back to the search agent with a highly targeted query, then pass the new findings back to the analysis agent to close the loop.",
          "This does not address the core issue in the scenario as directly as the correct answer.",
          "This does not address the core issue in the scenario as directly as the correct answer.",
          "This does not address the core issue in the scenario as directly as the correct answer."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-4",
        "question": "Your multi-agent research pipeline crashed after processing 12 of 28 documents. The web search agent had identified relevant sources, the document analyzer had partially complete and the synthesizer had begun pattern identification. You need to resume processing without repeating work or losing fidelity of prior findings. What state management approach be Information fidelity with context efficiency when restoring agent state?",
        "choices": [
          "Have each agent persist a structured export to a known location. On resume, the coordinator loads the manifest and injects relevant state into agent prompts.",
          "Persist the coordinator's conversation log containing all task delegations and responses, providing this to agents when resuming.",
          "Have each agent maintain its own persistent state file and reload it independently at the start of each session.",
          "Index all agent outputs in a shared vector store. When resuming each agent queries the store using semantic search to retrieve relevant prior findings."
        ],
        "correctIndex": 0,
        "explanation": "This provides high information fidelity (structured, complete outputs) while maintaining context efficiency (only relevant pieces are re-injected into prompts). The coordinator remains in control of what each agent needs, avoiding unnecessary bloat and duplication.",
        "choiceExplanations": [
          "This provides high information fidelity (structured, complete outputs) while maintaining context efficiency (only relevant pieces are re-injected into prompts). The coordinator remains in control of what each agent needs, avoiding unnecessary bloat and duplication.",
          "Conversation logs are often verbose and unstructured, leading to context overload and inefficient prompt usage without guaranteed clarity.",
          "This decentralizes control and can lead to inconsistencies and coordination issues, especially when agents need shared or aligned context.",
          "Vector stores are useful for retrieval, but they introduce probabilistic recall and may miss or distort critical structured state, reducing fidelity during recovery."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-5",
        "question": "The synthesis agent completes its initial pass but flags that three key research questions remain unanswered because the web search and document analysis agents didn't find relevant information on those specific subtopics. The coordinator currently proceeds directly to report generation, producing reports with incomplete coverage. What change would most effectively improve research completeness?",
        "choices": [
          "Have the coordinator evaluate synthesis output for gaps, then re-delegate to web search and document analysis with targeted queries before Invoking synthesis again.",
          "Increase the initial breadth of queries sent to web search and document analysis to reduce the probability of missing relevant information.",
          "Have the report generation agent note which research questions couldn't be answered, so users understand the limitations of the final output.",
          "Give the synthesis agent direct access to web search tools so it can autonomously fill knowledge gaps without returning control to the coordinator."
        ],
        "correctIndex": 0,
        "explanation": "This introduces an iterative feedback loop, where identified gaps are actively addressed. The coordinator maintains control and ensures completeness before final report generation.",
        "choiceExplanations": [
          "This introduces an iterative feedback loop, where identified gaps are actively addressed. The coordinator maintains control and ensures completeness before final report generation.",
          "Broader queries may help coverage but are inefficient and still won’t guarantee that specific gaps discovered later are filled.",
          "This improves transparency but does not solve the completeness problem.",
          "This breaks separation of concerns and reduces system control. The coordinator should manage task delegation, not the synthesis agent."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-6",
        "question": "When analyzing complex legal cases that cite multiple precedents, the document analysis subagent processes each sequentially. A landmark case citing 12 precedents takes over 3 minutes to analyze completely. What's the most effective way to reduce this latency while preserving the coordinator's ability to monitor and debug the system?",
        "choices": [
          "Enable the document analysis subagent to spawn its own specialized subagents dynamically when it encounters cases with many citations",
          "Implement a message queue where precedent analysis tasks are processed asynchronously by a pool of worker agents",
          "Create a recursive agent hierarchy where analysis agents subdivide work among child agents until reading single-precedent granularity",
          "Have the coordinator spawn parallel document analysis subagents, each handling a subset of precedents, then aggregate results before synthesis"
        ],
        "correctIndex": 3,
        "explanation": ". This enables parallel processing to reduce latency while keeping orchestration centralized. The coordinator retains full visibility, making monitoring and debugging easier.",
        "choiceExplanations": [
          ". This decentralizes orchestration and makes the system harder to monitor and debug. The coordinator loses visibility into dynamically spawned agents.",
          ". While this improves scalability, it introduces infrastructure complexity and reduces transparency for debugging at the coordinator level.",
          "This further complicates the architecture and makes tracing execution paths difficult, reducing observability and control.",
          ". This enables parallel processing to reduce latency while keeping orchestration centralized. The coordinator retains full visibility, making monitoring and debugging easier."
        ],
        "difficulty": "easy"
      },
      {
        "id": "orchestration-7",
        "question": "Introduction monitoring shows the research phase takes longer than expected. Analysis reveals the coordinator invokes the web search subagent, waits for its response, then invokes the document analysis subagent and waits again. These tasks are independent - neither requires the other's output. How should you modify the system to run these subagents concurrently?",
        "choices": [
          "Switch both subagents to use a Haiku tier model instead of to reduce their individual execution time.",
          "Create an async orchestration layer outside the agent that spawns parallel threads, each running a separate coordinator subagent pair, then aggregates results.",
          "Add detailed instructions to the coordinator's system prompt explaining the performance benefits of parallel execution and requesting it invoke both subagents at the same",
          "Structure the coordinator to emit both Task tool calls (for web search and document analysis) in a single response message rather than across separate conversation turns."
        ],
        "correctIndex": 3,
        "explanation": "Issuing both tool calls in one response enables true parallel execution, since the system can run them concurrently instead of waiting for one to finish before starting the other.",
        "choiceExplanations": [
          "This may reduce latency per task, but it does not address the core issue of sequential execution vs. parallelism.",
          "This overcomplicates the architecture and duplicates coordinators unnecessarily instead of fixing concurrency within the existing flow.",
          "time. Instructions alone are not reliable for enforcing concurrency. Execution behavior depends on how tool calls are structured, not just prompt wording.",
          "Issuing both tool calls in one response enables true parallel execution, since the system can run them concurrently instead of waiting for one to finish before starting the other."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-8",
        "question": "Production reviews reveal inconsistent handling of uncertainty in final reports. Sometimes conflicting subagent findings are synthesized into a single confident statement (losing other times reports over hedge with excessive qualifications (becoming unhelpful). When the web search agent returns \"Industry analysts estimate $50B market size (methodolo the document analysis agent returns \"peer-reviewed study estimates $358 (1578, 95% CI),\" the coordinator either picks one arbitrarily or produces vague statements like \"the ma 6358-6508 depending on factors.\" What systematic approach best addresses this?",
        "choices": [
          "Configure subagents to only report findings meeting a high confidence threshold, filtering uncertain information before it reaches the coordinator.",
          "Add a verification subagent that cross-references findings across sources, only passing claims to synthesis that are corroborated by at least two independent sources.",
          "Instruct the synthesis agent to structure reports with explicit sections distinguishing well-established findings from contested ones, preserving original source characterization and methodological context.",
          "Implement a confidence calibration layer that normalizes subagent uncertainty expressions to standardized probability scores (0.0-1.0), then weight-average findings by their calculated reliability scores to produce a statistically grounded synthesis."
        ],
        "correctIndex": 2,
        "explanation": "This directly addresses inconsistent handling of uncertainty by making it explicit and structured, allowing users to understand both consensus and disagreement without losing context.",
        "choiceExplanations": [
          "This suppresses potentially valuable but uncertain insights and introduces bias by hiding ambiguity rather than managing it.",
          "While useful for validation, this approach still filters out uncertainty instead of representing it, and may discard novel or emerging insights.",
          "This directly addresses inconsistent handling of uncertainty by making it explicit and structured, allowing users to understand both consensus and disagreement without losing context.",
          "This introduces artificial precision and may oversimplify complex, qualitative uncertainty, potentially misleading users."
        ],
        "difficulty": "hard"
      },
      {
        "id": "orchestration-9",
        "question": "In production, you observe that simple fact-checking queries (e.g., \"What year was the Paris Climate Agreement signed?\") traverse all four subagents sequentially, consuming 40+ seconds. While this might be acceptable for complex comparative research benefits from the full pipeline. Your query distribution is diverse and evolving as users discover new applications. What's the most effective approach to optimize for varying query complexity?",
        "choices": [
          "Implement pattern-based routing that categorizes queries by structure (single-fact vs. comparative vs. analytical) and maps each category to a predefined subagent combination.",
          "Train a query complexity classifier on labeled historical data to predict optimal subagent combinations, retraining periodically as query patterns evolve.",
          "Have the coordinator analyze each query and dynamically decide which subagents to invoke based on its assessment of query requirements.",
          "Create a fast-path for factual questions that bypasses subagents entirely, routing all other queries through the complete pipeline to ensure research thoroughness."
        ],
        "correctIndex": 2,
        "explanation": "This provides flexible, real-time routing without rigid rules or heavy ML infrastructure. The coordinator can tailor execution paths to query complexity efficiently.",
        "choiceExplanations": [
          "This is rigid and brittle. As query patterns evolve, maintaining rules becomes difficult and coverage gaps are likely.",
          "While adaptive, this introduces model maintenance overhead, requires labeled data, and may lag behind new or rare query types.",
          "This provides flexible, real-time routing without rigid rules or heavy ML infrastructure. The coordinator can tailor execution paths to query complexity efficiently.",
          "This is overly simplistic and risks misclassification, reducing accuracy or missing nuance for queries that appear simple but require deeper analysis."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-10",
        "question": "A user is expanding the research system beyond its single web search agent by adding specialized data sources. They add a financial API agent that returns structured JSON with margins, and growth rates; a news monitoring agent that returns prose summaries of recent developments; and a patent analysis agent that returns structured lists of technology synthesis agent combines these into executive briefings. Currently, it converts everything to bullet points, causing financial comparisons to lose tabular clarity and news summari narrative flow. What change would most improve briefing quality?",
        "choices": [
          "Update the synthesis agent to render each content type appropriately—financial data as tables, news as prose, and technical lists as structured points.",
          "Add a format conversion layer between subagents and synthesis that transforms all outputs to a common intermediate representation (such as Markdown) to facilitate more flexible rendering.",
          "Standardize all subagent outputs to JSON with fields for every data type to ensure programmatic consistency across the pipeline.",
          "Standardize all subagent outputs to prose summaries with a uniform character to maintain a consistent executive voice regardless of the source material."
        ],
        "correctIndex": 0,
        "explanation": "This preserves the natural structure and strengths of each data type, improving clarity, readability, and usefulness of the final briefing.",
        "choiceExplanations": [
          "This preserves the natural structure and strengths of each data type, improving clarity, readability, and usefulness of the final briefing.",
          "While helpful for consistency, this does not guarantee appropriate presentation of different content types and may still lead to generic formatting.",
          "This improves structure but shifts complexity to the synthesis stage and does not inherently improve human-readable output quality.",
          "This sacrifices important structure (like tables and lists), reducing clarity and effectiveness for data-heavy content."
        ],
        "difficulty": "hard"
      },
      {
        "id": "orchestration-11",
        "question": "The coordinator agent has AgentDefinitions configured for all four specialized subagents, each with appropriate descriptions, prompts, and tool restrictions. During testing, you notice the coordinator correctly reasons about when to delegate—it generates messages like “I’ll ask the web search agent to find sources on this topic”—but no subagent execution ever occurs. The coordinator then proceeds as if the delegation happened and continues with incomplete information. Logs show no errors. What is the most likely cause?",
        "choices": [
          "Subagent context isolation means task descriptions from the coordinator don’t automatically reach subagents; you need to configure explicit context forwarding in Claude AgentOptions.",
          "The coordinator’s max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent type parameter can be specified.",
          "The coordinator’s allowed Tools configuration doesn’t include “Task”, so while it can reason about delegation, cannot invoke the tool required to spawn subagents.",
          "The AgentDefinitions are configured correctly, but the coordinator’s system prompt doesn’t explicitly list the available subagent types, preventing the model from knowing they can be invoked."
        ],
        "correctIndex": 2,
        "explanation": "The coordinator can plan and describe delegation, but without the Task tool enabled, it cannot actually execute subagent calls—resulting in no errors but no execution.",
        "choiceExplanations": [
          "Even with context isolation, subagents would still be invoked—the issue here is that no invocation happens at all, not that context is missing.",
          "Token limits might truncate responses, but this would typically produce malformed outputs or errors—not silent absence of any tool calls.",
          "The coordinator can plan and describe delegation, but without the Task tool enabled, it cannot actually execute subagent calls—resulting in no errors but no execution.",
          "While listing agents can help, the model already demonstrates awareness (“I’ll ask the web search agent…”). The problem is execution capability, not awareness."
        ],
        "difficulty": "hard"
      },
      {
        "id": "orchestration-12",
        "question": "In production, final reports frequently contain claims without proper source attribution. Investigation shows that while the web search and document analysis agents correctly attach citations to their outputs, the synthesis agent loses track of which sources support which conclusions when combining findings. What's the most effective architectural change?",
        "choices": [
          "Add a verification step where the report generator uses semantic similarity matching against original sources to reconstruct which claims came from which documents.",
          "Have the coordinator inject source identifier prefixes into text before each handoff, then parse these prefixes at report generation to reconstruct citations.",
          "Maintain complete transcripts of all subagent interactions and add a citation-resolution agent to analyze logs and determine attributions before report generation.",
          "Require all subagents to output structured claim-source mappings that the synthesis agent must preserve and merge when combining findings from multiple sources."
        ],
        "correctIndex": 3,
        "explanation": "This ensures end-to-end attribution fidelity by keeping claim-to-source relationships explicit and structured throughout the pipeline, preventing loss during synthesis.",
        "choiceExplanations": [
          "This relies on post-hoc inference, which is error-prone and can misattribute claims due to semantic ambiguity.",
          "This is a fragile, text-based workaround that can break during transformations and doesn’t scale well.",
          "This adds unnecessary complexity and still depends on indirect reconstruction rather than preserving attribution explicitly.",
          "This ensures end-to-end attribution fidelity by keeping claim-to-source relationships explicit and structured throughout the pipeline, preventing loss during synthesis."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-13",
        "question": "After the web search and document analysis subagents complete their tasks, the coordinator needs to spawn the synthesis subagent to synthesize the findings. What is the correct approach for providing the synthesis subagent with the information it needs?",
        "choices": [
          "Provide the subagent with tool definitions that allow it to request outputs from other subagents via callbacks",
          "Include the complete findings from both subagents directly in the synthesis subagent's prompt",
          "Pass reference Identifiers and configure the subagent with read access to a shared memory store where other subagents deposited their results",
          "Spawn the subagent with only a brief task description, relying on automatic context inheritance from the coordinator"
        ],
        "correctIndex": 2,
        "explanation": "This is the most scalable and production-ready approach. It preserves information fidelity while avoiding context bloat, allowing the synthesis agent to retrieve exactly what it needs.",
        "choiceExplanations": [
          ". This introduces unnecessary coupling and complexity. Subagents shouldn’t need to actively fetch data from others.",
          ". While simple, this approach does not scale well for large outputs and can exceed context limits, reducing efficiency.",
          "This is the most scalable and production-ready approach. It preserves information fidelity while avoiding context bloat, allowing the synthesis agent to retrieve exactly what it needs.",
          ". There is no automatic context inheritance—without explicit data access, the synthesis agent cannot function properly."
        ],
        "difficulty": "easy"
      },
      {
        "id": "orchestration-14",
        "question": "The web search agent has gathered several relevant sources for a research topic. The document analysis agent now needs to examine these sources. How does information flow between these two specialized subagents?",
        "choices": [
          "\"The coordinator agent receives the web search agent's output and includes relevant findings in the prompt when invoking the document analysis agent.",
          "The agents communicate through an event-driven message queue, with the document analysis agent subscribing to web search completion events.",
          "The web search agent directly invokes the document analysis agent, using the discovered sources as parameters.",
          "Both agents access a shared memory store where the web search agent writes findings and the document analysis agent reads them."
        ],
        "correctIndex": 0,
        "explanation": "This follows the standard orchestration pattern where the coordinator manages all data flow, explicitly passing outputs between subagents.",
        "choiceExplanations": [
          "This follows the standard orchestration pattern where the coordinator manages all data flow, explicitly passing outputs between subagents.",
          "This introduces unnecessary infrastructure complexity and is not the typical agent orchestration model.",
          "Subagents should not invoke each other directly; this breaks centralized control and observability.",
          "While possible in advanced systems, this is not the standard or simplest approach; it adds complexity without clear necessity in typical pipelines."
        ],
        "difficulty": "easy"
      },
      {
        "id": "orchestration-15",
        "question": "After the web search agent finds 25 sources (120K tokens of raw content), the document analysis agent extracts key insights (15K tokens), and the synthesis agent produces a coherent narrative draft (3K tokens), the coordinator must pass context to the report generation agent for the final output with proper source citations. What context-passing strategy provides the best balance of completeness and efficiency?",
        "choices": [
          "Pass only the synthesis draft and have a separate post-processing pipeline match claims to sources and insert citations after the report is generated.",
          "Pass the full accumulated context from all prior agents.",
          "Pass the synthesis draft along with a structured source index that maps key claims to their source URLs and ant Irant excerpts.",
          "Pass a condensed summary of all prior stages that preserves the main findings and attributes them to sources by name only."
        ],
        "correctIndex": 2,
        "explanation": "This provides the best balance of completeness and efficiency—retaining precise attribution while keeping context size manageable.",
        "choiceExplanations": [
          "This relies on post-hoc reconstruction, which is error-prone and can lead to incorrect or missing citations.",
          "This ensures completeness but is highly inefficient (120K+ tokens) and risks exceeding context limits.",
          "This provides the best balance of completeness and efficiency—retaining precise attribution while keeping context size manageable.",
          "This loses granularity and makes precise citation mapping difficult, reducing attribution fidelity."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-77",
        "question": "The coordinator agent has AgentDefinitions configured for all four specialized subagents, each with appropriate descriptions, prompts, and tool restrictions. During testing, you notice the coordinator correctly reasons about when to delegate—it generates messages like \"I'll ask the web search agent to find sources on this topic\"—but no subagent execution ever occurs. The coordinator then proceeds as if the delegation happened and continues with incomplete information. Logs show no errors. What is the most likely cause?",
        "choices": [
          "The coordinator's max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent type parameter can be specified.",
          "The coordinator's allowedTools configuration doesn't include \"Task\", so while it can reason about delegation, it cannot invoke the tool required to spawn subagents.",
          "Subagent context isolation means task descriptions from the coordinator don't automatically reach subagents; you need to configure explicit context forwarding in ClaudeAgentOptions.",
          "The AgentDefinitions are configured correctly, but the coordinator's system prompt doesn't explicitly list the available subagent types, preventing the model from knowing they can be invoked."
        ],
        "correctIndex": 1,
        "explanation": "This exactly matches the symptom: the model plans to delegate (reasoning is fine), but cannot execute the tool call, so no subagent runs and no errors appear at the reasoning level.",
        "choiceExplanations": [
          "If this were the cause, you’d typically see partial tool calls or parsing errors in logs—not silent absence of tool execution.",
          "This exactly matches the symptom: the model plans to delegate (reasoning is fine), but cannot execute the tool call, so no subagent runs and no errors appear at the reasoning level.",
          "This would affect what subagents receive, not whether they are spawned at all.",
          "The model is clearly aware of delegation (it verbalizes it), so discovery is not the issue—execution capability is. Key idea: reasoning about tools ≠ permission to use tools; missing tool authorization leads to silent non-execution."
        ],
        "difficulty": "hard"
      },
      {
        "id": "orchestration-78",
        "question": "Production reviews reveal inconsistent handling of uncertainty in final reports. Sometimes conflicting subagent findings are synthesized into a single confident statement (losing nuance), while other times reports over-hedge with excessive qualifications (becoming unhelpful). When the web search agent returns \"industry analysts estimate $50B market size (methodology varies)\" and the document analysis agent returns \"peer-reviewed study estimates $35B (±$7B, 95% CI),\" the coordinator either picks one arbitrarily or produces vague statements like \"the market may be $35B-$50B depending on factors.\" What systematic approach best addresses this?",
        "choices": [
          "Implement a confidence calibration layer that normalizes subagent uncertainty expressions to standardized probability scores (0.0-1.0), then weight-average findings by their calibrated confidence.",
          "Instruct the synthesis agent to structure reports with explicit sections distinguishing well-established findings from contested ones, preserving original source characterizations and methodological context.",
          "Configure subagents to only report findings meeting a high-confidence threshold, filtering uncertain information before it reaches the coordinator.",
          "Add a verification subagent that cross-references findings across sources, only passing claims to synthesis that are corroborated by at least two independent sources."
        ],
        "correctIndex": 1,
        "explanation": "This directly addresses the root problem: loss of nuance. It preserves multiple viewpoints, uncertainty types, and methodological differences, while still producing a coherent, structured report instead of collapsing everything into a misleading single value or vague range.",
        "choiceExplanations": [
          "This forces incompatible uncertainty types (market estimates, confidence intervals, analyst opinions) into a single numeric scale, which can distort meaning and oversimplify fundamentally different methodologies.",
          "This directly addresses the root problem: loss of nuance. It preserves multiple viewpoints, uncertainty types, and methodological differences, while still producing a coherent, structured report instead of collapsing everything into a misleading single value or vague range.",
          "This removes the very uncertainty signals needed for proper synthesis and biases outputs toward false certainty.",
          "This is too restrictive for domains like market sizing where disagreement is meaningful and expected, not a sign of invalid data."
        ],
        "difficulty": "hard"
      },
      {
        "id": "orchestration-79",
        "question": "You've configured the system so that all four subagents have access to the complete set of 18 tools. During testing, agents frequently call tools outside their specialization—the synthesis agent attempts web searches, and the report generator tries to analyze documents. What is the primary cause of this poor tool selection behavior?",
        "choices": [
          "Choosing from 18 tools instead of 4-5 relevant ones increases decision complexity beyond reliable selection thresholds.",
          "The agents' role descriptions in their system prompts conflict with having access to tools outside that role.",
          "The tool definitions consume too much context window space, leaving insufficient room for task content.",
          "The coordinator cannot track which capabilities each subagent has, leading to misrouted tasks."
        ],
        "correctIndex": 0,
        "explanation": "This is the core issue: as the number of available tools grows, especially across multiple unrelated domains, the model’s tool selection accuracy degrades due to increased choice entropy and decision load. Even if each tool is well-described, having too many options in the same context makes it harder for the model to reliably pick the correct one, leading to cross-role tool misuse. Why the others are not correct:",
        "choiceExplanations": [
          "This is the core issue: as the number of available tools grows, especially across multiple unrelated domains, the model’s tool selection accuracy degrades due to increased choice entropy and decision load. Even if each tool is well-described, having too many options in the same context makes it harder for the model to reliably pick the correct one, leading to cross-role tool misuse. Why the others are not correct:",
          "Role prompts influence behavior, but they don’t inherently break tool selection when tools are available.",
          "There’s no indication of truncation or missing tool definitions—this is a selection problem, not a capacity problem.",
          "The failure happens at the subagent decision level, not because the coordinator lacks awareness of tools."
        ],
        "difficulty": "easy"
      },
      {
        "id": "orchestration-80",
        "question": "The coordinator provides detailed step-by-step instructions to the web search subagent, specifying exact search queries, source priorities, and date filters. Production monitoring reveals three issues: (1) the subagent reports \"insufficient results\" rather than trying alternative approaches when pre-specified searches fail, (2) research quality drops for emerging topics that don't match expected patterns, and (3) the subagent rarely surfaces valuable tangential sources. What's the most effective way to improve subagent adaptability?",
        "choices": [
          "Specify research goals and quality criteria (coverage breadth, source diversity, recency) rather than procedural steps, letting the subagent determine its search strategy.",
          "Add explicit fallback directives to the detailed instructions: \"If specified searches yield fewer than N results, attempt alternative query formulations before reporting failure.\"",
          "Remove procedural details entirely, delegating with simple goals like \"research X thoroughly\" and relying on the subagent's general capabilities.",
          "Implement a topic classification step where the coordinator categorizes requests as \"well-defined\" or \"exploratory\" and uses different instruction styles for each category."
        ],
        "correctIndex": 0,
        "explanation": "This is the most effective fix because it shifts from over-constrained instructions (procedural control) to objective-driven autonomy, allowing the subagent to adapt when initial queries fail and to explore tangential but relevant sources.",
        "choiceExplanations": [
          "This is the most effective fix because it shifts from over-constrained instructions (procedural control) to objective-driven autonomy, allowing the subagent to adapt when initial queries fail and to explore tangential but relevant sources.",
          "This helps slightly, but it still locks behavior into predefined contingencies and doesn’t generalize to novel or emerging topics.",
          "Too vague—removing structure entirely reduces reliability and makes output quality inconsistent.",
          "This adds complexity and still relies on rigid instruction modes rather than enabling adaptive search behavior."
        ],
        "difficulty": "hard"
      },
      {
        "id": "orchestration-81",
        "question": "The synthesis agent receives summarized findings from the web search and document analysis agents, then passes a consolidated summary to the report generator. During testing, you discover the generated reports make factual claims without proper citations—the report generator cannot attribute statements to their original sources because that metadata was lost during the summarization steps. What's the most effective approach to ensure proper source attribution in the final reports?",
        "choices": [
          "Have each agent output structured data separating content summaries from source metadata (URLs, document names, page numbers).",
          "Have the report generator query the web search agent to re-locate sources for claims in the final report.",
          "Skip summarization and pass full raw outputs from web search and document analysis directly to the report generator.",
          "Instruct the synthesis agent to embed source references inline within its summary text using a consistent citation format."
        ],
        "correctIndex": 0,
        "explanation": "This is the most reliable solution because it preserves provenance as first-class data, ensuring citations are never lost during summarization. The report generator can then deterministically map claims back to their original sources.",
        "choiceExplanations": [
          "This is the most reliable solution because it preserves provenance as first-class data, ensuring citations are never lost during summarization. The report generator can then deterministically map claims back to their original sources.",
          "This is inefficient and unreliable because it requires reverse-matching claims to sources, which can be ambiguous or fail entirely.",
          "This avoids the problem but is not scalable and leads to context bloat and degraded performance.",
          "This helps, but it still risks losing or breaking attribution during downstream transformations and does not enforce structured traceability."
        ],
        "difficulty": "hard"
      },
      {
        "id": "orchestration-82",
        "question": "A user is expanding the research system beyond its single web search agent by adding specialized data sources. They add a financial API agent that returns structured JSON with revenue, margins, and growth rates; a news monitoring agent that returns prose summaries of recent developments; and a patent analysis agent that returns structured lists of technology areas. The synthesis agent combines these into executive briefings. Currently, it converts everything to bullet points, causing financial comparisons to lose tabular clarity and news summaries to lose narrative flow. What change would most improve briefing quality?",
        "choices": [
          "Update the synthesis agent to render each content type appropriately—financial data as tables, news as prose",
          "Standardize all subagent outputs to JSON with fields for claim, evidence, source, and confidence",
          "Add a format conversion layer between subagents and synthesis that transforms all outputs to a common intermediate representation",
          "Standardize all subagent outputs to prose summaries with inline citations"
        ],
        "correctIndex": 0,
        "explanation": "This works because it preserves the native structure of each data type at the point where it matters most (final synthesis). Financial data remains comparable in tabular form, news retains narrative coherence, and patents stay structured as categorized lists. The key improvement is that the synthesis layer becomes format-aware instead of flattening everything into bullets, which is exactly what was causing quality loss. Why the others are not correct:",
        "choiceExplanations": [
          "This works because it preserves the native structure of each data type at the point where it matters most (final synthesis). Financial data remains comparable in tabular form, news retains narrative coherence, and patents stay structured as categorized lists. The key improvement is that the synthesis layer becomes format-aware instead of flattening everything into bullets, which is exactly what was causing quality loss. Why the others are not correct:",
          "This forces unrelated data types into a single schema and strips meaningful presentation structure like tables and narratives.",
          "This risks over-normalization into a lowest-common-denominator format, reducing expressiveness.",
          "This removes structure from financial and analytical data, reducing precision and comparability."
        ],
        "difficulty": "hard"
      },
      {
        "id": "orchestration-88",
        "question": "Production monitoring shows that follow-up queries like \"summarize what we learned about market trends\" consistently take 40+ seconds. Investigation reveals the coordinator spawns the synthesis subagent for each summarization request, passing 80K+ tokens of accumulated findings. The coordinator already has these findings in its context from orchestrating the research. What's the most effective way to improve response time for these follow-up summaries?",
        "choices": [
          "Enable prompt caching on the synthesis subagent to reduce the overhead of repeatedly transferring the same research findings.",
          "Have the coordinator handle straightforward summarization requests directly using its existing context, reserving subagent spawning for complex analy",
          "Spawn the synthesis subagent with reduced context and have it request specific findings from the coordinator on-demand.",
          "Pre-generate and cache summaries at multiple granularities whenever new findings accumulate."
        ],
        "correctIndex": 1,
        "explanation": "sis tasks. This avoids unnecessary orchestration overhead. Since the coordinator already possesses the accumulated findings in-context, simple summarization can be done immediately without rehydrating 80K+ tokens into another agent call.",
        "choiceExplanations": [
          "Caching helps with repeated prompt transfer costs, but it still requires spawning the subagent and processing a huge context for relatively simple follow-up summaries.",
          "sis tasks. This avoids unnecessary orchestration overhead. Since the coordinator already possesses the accumulated findings in-context, simple summarization can be done immediately without rehydrating 80K+ tokens into another agent call.",
          "This adds coordination complexity and multiple back-and-forth exchanges, which can increase latency rather than reduce it.",
          "Useful for some systems, but over-engineered here and inefficient if many summaries are never requested."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-89",
        "question": "The document analysis agent has a single analyze_document tool that takes a document and a free-text instruction parameter. During evaluation, requests like \"extract the key financial metrics\" often return narrative summaries, while \"summarize the methodology\" sometimes returns raw data tables. The synthesis agent reports that 35% of analysis results require re-requests with clarified instructions. What's the most effective way to improve reliability?",
        "choices": [
          "Enhance the tool description with detailed examples showing how different instruction phrasings should map to different output formats",
          "Keep the single tool but add an analysis_type enum parameter requiring explicit selection between extraction, summarization, and verification modes",
          "Split the generic tool into purpose-specific tools - extract_data_points, summarize_content, verify_claim_against_source - each with defined input/output contracts",
          "Have the coordinator pre-classify each analysis request before passing instructions to the document analysis agent"
        ],
        "correctIndex": 2,
        "explanation": "This most effectively improves reliability because each tool has a clear purpose, constrained behavior, and predictable output format, dramatically reducing ambiguity and re-requests.",
        "choiceExplanations": [
          "Examples help somewhat, but the core problem is that the tool itself is overloaded with multiple responsibilities and ambiguous behavior.",
          "This improves clarity, but the tool still mixes fundamentally different workflows and output contracts into one interface.",
          "This most effectively improves reliability because each tool has a clear purpose, constrained behavior, and predictable output format, dramatically reducing ambiguity and re-requests.",
          "This shifts ambiguity upstream but does not solve the underlying problem of a single overloaded tool with inconsistent outputs."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-130",
        "question": "The document analysis agent has a single analyze_document tool that takes a document and a free-text instruction parameter. During evaluation, requests like \"key financial metrics\" often return narrative summaries, while \"summarize the methodology\" sometimes returns raw data tables. The synthesis agent reports analysis results require re-requests with clarified instructions. What's the most effective way to improve reliability?",
        "choices": [
          "Enhance the tool description with detailed examples showing how different instruction phrasings should map to different output formats",
          "Keep the single tool but add an analysis type enum parameter requiring explicit selection between extraction, summarization, and verification",
          "Have the coordinator pre-classify each analysis request before passing instructions to the document analysis agent",
          "Split the generic tool into purpose specific tools—extract data points, summarize content, verify claim against source—each with"
        ],
        "correctIndex": 3,
        "explanation": ") The root cause is that a single tool with a free-text instruction parameter has ambiguous semantics, leading to inconsistent outputs. Splitting it into purpose-specific tools removes this ambiguity by giving each tool a clear responsibility and expected output format. This makes tool selection more reliable and reduces the need for re-requests or clarification by downstream agents.",
        "choiceExplanations": [
          ". () Examples may improve performance, but the tool still relies on interpreting free-text instructions, leaving ambiguity and inconsistency in place.",
          ". () An enum helps reduce ambiguity, but the tool still combines multiple responsibilities. Purpose-specific tools generally provide clearer semantics and more reliable behavior.",
          ". () This shifts the classification burden elsewhere but does not solve the underlying issue that the tool itself performs multiple distinct tasks with overlapping behavior.",
          ") The root cause is that a single tool with a free-text instruction parameter has ambiguous semantics, leading to inconsistent outputs. Splitting it into purpose-specific tools removes this ambiguity by giving each tool a clear responsibility and expected output format. This makes tool selection more reliable and reduces the need for re-requests or clarification by downstream agents."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-131",
        "question": "In production, you observe that simple fact-checking queries (e.g., \"What year was the Paris Climate Agreement signed?\") traverse all four subagents sequentially, consuming 40+ seconds and significant tokens per query. Complex comparative research benefits from the full pipeline. Your query distribution is diverse and evolving as users discover new applications. What's the most effective approach to optimize for varying query complexity?",
        "choices": [
          "Have the coordinator analyze each query and dynamically decide which subagents to invoke based on its assessment of query requirements.",
          "Train a query complexity classifier on labeled historical data to predict optimal subagent combinations, retraining periodically as query patterns evolve.",
          "Create a fast-path for factual questions that bypasses subagents entirely, routing all other queries through the complete pipeline to ensure research thorough",
          "Implement pattern-based routing that categorizes queries by structure (single-fact vs. comparative vs. analytical) and maps each category to a predefined combination."
        ],
        "correctIndex": 1,
        "explanation": "() A trained classifier provides fast, consistent routing decisions based on learned patterns from historical data. It reduces latency by avoiding full LLM-based orchestration per query and adapts over time through retraining as usage patterns shift.",
        "choiceExplanations": [
          "() This relies on runtime LLM judgment for every request, which adds latency and inconsistency. It is less efficient than a learned routing policy and does not scale well as query patterns diversify.",
          "() A trained classifier provides fast, consistent routing decisions based on learned patterns from historical data. It reduces latency by avoiding full LLM-based orchestration per query and adapts over time through retraining as usage patterns shift.",
          "ness. () This improves performance for a subset of queries but creates a rigid binary system that cannot handle intermediate or evolving query complexities effectively.",
          "() Rule-based pattern routing is brittle and struggles to generalize to new or ambiguous query types, requiring frequent manual updates as usage evolves."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-132",
        "question": "Your multi-agent research pipeline crashed after processing 12 of 28 documents. The web search agent had identified relevant sources, the document analyzer had partially completed extraction, and the synthesizer had begun pattern identification. You need to resume processing without repeating work or losing fidelity of prior findings. What state management approach best balances information fidelity with context efficiency when restoring agent state?",
        "choices": [
          "Index all agent outputs in a shared vector store. When resuming, each agent queries the store using semantic search to retrieve relevant prior findings.",
          "Have each agent maintain its own persistent state file and reload it independently at the start of each session.",
          "Have each agent persist a structured export to a known location. On resume, the coordinator loads the manifest and injects relevant state into agent prompts.",
          "Persist the coordinator's conversation log containing all task delegations and responses, providing this to agents when resuming."
        ],
        "correctIndex": 2,
        "explanation": "() This approach preserves structured, deterministic intermediate state from each agent, which is critical for resuming a partially completed multi-agent pipeline without redoing work. The coordinator can reconstruct the workflow precisely by loading a manifest of completed and partial results, then selectively passing only the required context back into each agent. It avoids redundant computation, prevents loss of fidelity, and keeps context usage efficient by not reintroducing full logs or relying on probabilistic retrieval mechanisms.",
        "choiceExplanations": [
          "() Vector search introduces non-deterministic retrieval, which can miss exact intermediate structured outputs needed for correct continuation of a pipeline.",
          "() This leads to fragmented state ownership, making cross-agent coordination harder and increasing the risk of inconsistencies in shared workflow context.",
          "() This approach preserves structured, deterministic intermediate state from each agent, which is critical for resuming a partially completed multi-agent pipeline without redoing work. The coordinator can reconstruct the workflow precisely by loading a manifest of completed and partial results, then selectively passing only the required context back into each agent. It avoids redundant computation, prevents loss of fidelity, and keeps context usage efficient by not reintroducing full logs or relying on probabilistic retrieval mechanisms.",
          "() Raw logs are unstructured and inefficient, and may include irrelevant context that wastes tokens and reduces clarity when resuming execution."
        ],
        "difficulty": "medium"
      },
      {
        "id": "orchestration-134",
        "question": "Production monitoring shows the research phase takes longer than expected. Analysis reveals the coordinator invokes the web search subagent, then invokes the document analysis subagent and waits again. These tasks are independent—neither requires the other's output. What is the most effective way to run these subagents concurrently?",
        "choices": [
          "Switch both subagents to use a Haiku-tier model instead of Sonnet to reduce their individual execution time.",
          "Create an async orchestration layer outside the agent that spawns parallel threads, each running a separate coordinator.",
          "Structure the coordinator to emit both Task tool calls (for web search and document analysis) in a single response message.",
          "Add detailed instructions to the coordinator's system prompt explaining the performance benefits of parallel execution at the same time."
        ],
        "correctIndex": 2,
        "explanation": "() This enables true concurrent execution at the tool-calling layer. Since the web search and document analysis subagents are independent, issuing both tool calls in the same coordinator response allows the runtime to execute them in parallel instead of waiting for one to finish before starting the other. This directly removes the sequential bottleneck without changing model quality or adding unnecessary system complexity.",
        "choiceExplanations": [
          "() This reduces per-task latency but does not address the core inefficiency, which is sequential execution, not model speed.",
          "() This introduces unnecessary architectural complexity and duplicates coordination logic when parallelism can already be achieved within a single coordinator response.",
          "() This enables true concurrent execution at the tool-calling layer. Since the web search and document analysis subagents are independent, issuing both tool calls in the same coordinator response allows the runtime to execute them in parallel instead of waiting for one to finish before starting the other. This directly removes the sequential bottleneck without changing model quality or adding unnecessary system complexity.",
          "() Prompt instructions alone cannot guarantee parallel execution; only structured multi-tool invocation can enforce concurrency."
        ],
        "difficulty": "easy"
      }
    ]
  },
  {
    "id": "coding",
    "name": "Claude Code & Agentic Engineering",
    "description": "Using Claude Code and CLAUDE.md effectively for real engineering workflows: reviews, refactors, migrations, and MCP tooling.",
    "color": "#4ADE80",
    "icon": "terminal",
    "order": 5,
    "questions": [
      {
        "id": "coding-98",
        "question": "You're building a security scanning workflow. When engineers need to locate all occurrences of a dangerous function like eval() across a large codebase, which tool should your agent use for content search?",
        "choices": [
          "Use Grep to search for the pattern \"eval(\" across all files in the codebase.",
          "Use Glob with a pattern like **/*eval to find files, then Read each matching file.",
          "Use Bash to run ls -R | grep eval to recursively list files containing eval.",
          "Read the project's main entry file and follow import statements to trace where eval might be used."
        ],
        "correctIndex": 0,
        "explanation": "() Grep is specifically designed for content searching within files. It can efficiently scan a large codebase and locate every occurrence of a pattern such as eval(, making it the most appropriate tool for security analysis and code auditing.",
        "choiceExplanations": [
          "() Grep is specifically designed for content searching within files. It can efficiently scan a large codebase and locate every occurrence of a pattern such as eval(, making it the most appropriate tool for security analysis and code auditing.",
          "() Glob searches file names and paths, not file contents. It would miss occurrences of eval( inside files whose names do not contain \"eval\".",
          "() This searches file names returned by ls, not the contents of files.",
          "() This is inefficient and unreliable for finding all occurrences across a large codebase. It may miss many uses of eval()."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-99",
        "question": "agent has identified that caching logic spans 15 files including decorators, middleware, and service classes (~8,000 lines total). What's next step for building understanding while managing context constraints?",
        "choices": [
          "Use Glob to find files matching common caching patterns (cache.py, caching/), prioritize the largest files by reading them first, then check smaller files for gaps.",
          "Use the Read tool to sequentially load all 15 files, building complete understanding across the full caching implementation.",
          "Use Grep to search for \"invalidate\" and \"expire\" patterns across all files, then Read only those specific line ranges with minimal surrounding context.",
          "Analyze imports and class hierarchies to identify the base cache class, Read that file to understand the interface, then trace specific invalidation implementations."
        ],
        "correctIndex": 3,
        "explanation": "() When the logic spans many files (~8,000 lines), the goal is to build understanding efficiently while respecting context limits. Starting with the core abstraction (the base cache class or interface) provides a high-level understanding of how the caching system is structured. From there, you can trace the specific implementations and invalidation paths that matter, rather than reading thousands of lines indiscriminately.",
        "choiceExplanations": [
          ") File size is not a reliable indicator of importance. Large files may contain unrelated logic.",
          "() This is inefficient and likely to exceed context constraints. Understanding should be built incrementally.",
          "() While useful for targeted investigation, this can miss the broader architecture and relationships needed to understand the caching system correctly.",
          "() When the logic spans many files (~8,000 lines), the goal is to build understanding efficiently while respecting context limits. Starting with the core abstraction (the base cache class or interface) provides a high-level understanding of how the caching system is structured. From there, you can trace the specific implementations and invalidation paths that matter, rather than reading thousands of lines indiscriminately."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-100",
        "question": "Today she wants to continue that specific investigation. She's worked on three other codebases since then and knows the session was dive\". How should she resume?",
        "choices": [
          "Start fresh and re-read the same files",
          "Use --resume auth-deep-dive to load that specific session by name",
          "Use --continue to pick up where the most recent conversation left off",
          "Use --session-id with the UUID from yesterday's session transcript file"
        ],
        "correctIndex": 1,
        "explanation": "() When returning to a specific investigation after working on other projects, using --resume with the session name is the most direct way to continue that exact context. It restores the relevant conversation and state associated with the named session.",
        "choiceExplanations": [
          "() This discards existing context and wastes time rebuilding understanding.",
          "() When returning to a specific investigation after working on other projects, using --resume with the session name is the most direct way to continue that exact context. It restores the relevant conversation and state associated with the named session.",
          "() --continue resumes the most recent session, which may be one of the other codebases worked on since then.",
          "() While a session ID could identify a session, the question specifically indicates the session is already known by name, making --resume auth-deep-dive the appropriate approach."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-101",
        "question": "\"You're the Lead Data Scientist/Engineer on a critical project. Something is not completely right with technical details or the data, and it negative impacts expected outputs. They need to independently develop both approaches to evaluation data... How do you manage this scenario?\"",
        "choices": [
          "Start two fresh sessions, having each re-read the relevant source files before beginning.",
          "Continue in the original session, developing end-to-end tests first, then snapshot tests sequentially.",
          "Resume the analysis session with fork_session enabled, creating a separate branch for each testing strategy.",
          "Export the analysis session's key findings to a file, then create two new sessions that reference this file."
        ],
        "correctIndex": 2,
        "explanation": "() Forking the existing session allows both testing strategies to start from the same investigation context and understanding of the codebase. Each branch can then evolve independently, making it easy to compare approaches without losing prior analysis or mixing the reasoning paths.",
        "choiceExplanations": [
          "() This duplicates work and loses the benefit of the existing analysis context.",
          "() Sequential development makes comparison harder and mixes the reasoning for the two approaches.",
          "() Forking the existing session allows both testing strategies to start from the same investigation context and understanding of the codebase. Each branch can then evolve independently, making it easy to compare approaches without losing prior analysis or mixing the reasoning paths.",
          "() While possible, it is less efficient than directly forking the existing session and maintaining full contextual continuity."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-102",
        "question": "A security audit requires updating your authentication library from v2 to v3. The migration guide documents breaking changes: authenticate() now returns a Promise instead of accepting a callback, the User type has restructured fields, and three deprecated methods were removed. Grep shows the library is imported in 45 files across several modules. What's the most effective approach?",
        "choices": [
          "Paste the migration guide's breaking changes into your prompt and use direct execution to update all usages across the 45 files.",
          "Enter plan mode to explore library usage across modules, map affected code paths, then create a migration strategy before implementing.",
          "Update the dependency version, run the test suite, and use Claude Code to fix each failure as it appears.",
          "Create a custom slash command encapsulating the migration transformations, then execute it against each file without prior codebase exploration."
        ],
        "correctIndex": 1,
        "explanation": "() A major library upgrade with breaking changes affecting 45 files should be approached systematically. Plan mode helps analyze how the authentication library is used across the codebase, identify callback-based implementations that must be converted to Promises, understand dependencies on the restructured User type, and locate uses of deprecated methods. Creating a migration strategy before making changes reduces risk and ensures consistency across all modules.",
        "choiceExplanations": [
          "() Directly modifying dozens of files without first understanding usage patterns can introduce widespread errors and inconsistent implementations.",
          "() A major library upgrade with breaking changes affecting 45 files should be approached systematically. Plan mode helps analyze how the authentication library is used across the codebase, identify callback-based implementations that must be converted to Promises, understand dependencies on the restructured User type, and locate uses of deprecated methods. Creating a migration strategy before making changes reduces risk and ensures consistency across all modules.",
          "() This is a reactive approach that depends on test coverage and may miss affected code paths that are not exercised by tests.",
          "() Automating changes without understanding the codebase can apply incorrect transformations and create additional issues."
        ],
        "difficulty": "medium"
      },
      {
        "id": "coding-103",
        "question": "During testing, you observe that in extended exploration sessions (30+ minutes), the agent starts giving inconsistent answers about context discussed earlier. Engineers report having to repeat context about modules they've already explored. What's the most effective approach to address this?",
        "choices": [
          "Create summaries of all source files before exploration begins, loading only these compressed representations into context.",
          "Switch to a higher-capacity model tier to provide more context window space for accumulated exploration data.",
          "Implement automatic context clearing every 15 minutes to ensure the agent starts with fresh, uncontaminated context.",
          "Have the agent maintain a scratchpad file that records key findings, referencing it for subsequent questions."
        ],
        "correctIndex": 3,
        "explanation": "() In long exploration sessions, context window limitations can cause earlier discoveries to be forgotten or summarized away. Maintaining a persistent scratchpad of important findings, module relationships, decisions, and observations allows the agent to consistently reference prior work without requiring engineers to repeatedly provide the same context.",
        "choiceExplanations": [
          "() Summaries can omit important implementation details and are not a complete substitute for maintaining evolving investigation knowledge.",
          "() A larger context window may help temporarily, but it does not solve the underlying problem of managing knowledge across lengthy investigations.",
          "() Clearing context would worsen the problem by causing the agent to lose even more information from the ongoing investigation.",
          "() In long exploration sessions, context window limitations can cause earlier discoveries to be forgotten or summarized away. Maintaining a persistent scratchpad of important findings, module relationships, decisions, and observations allows the agent to consistently reference prior work without requiring engineers to repeatedly provide the same context."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-104",
        "question": "old_string parameter cannot find unique text to match — the file has repetitive docstrings, variable names, and structural patterns. What is a reliable way to complete this insertion?",
        "choices": [
          "Use Edit with an extremely long old_string capturing 30+ lines of context to guarantee uniqueness",
          "Use Read to load the file, add the function at the appropriate location, then Write the updated file",
          "Use Edit's replace_all parameter to target a common pattern and embed the new function in the replacement text",
          "Use Bash to append the function definition to the end of the file using heredoc syntax"
        ],
        "correctIndex": 1,
        "explanation": "() When old_string cannot uniquely identify a match due to repetitive patterns, the most reliable approach is to first read the full file, understand its structure, and then rewrite or update the file explicitly. This avoids ambiguity and ensures the insertion happens in the correct location without relying on fragile string matching.",
        "choiceExplanations": [
          "() This is brittle and error-prone; large context strings still may not guarantee uniqueness in repetitive files.",
          "() When old_string cannot uniquely identify a match due to repetitive patterns, the most reliable approach is to first read the full file, understand its structure, and then rewrite or update the file explicitly. This avoids ambiguity and ensures the insertion happens in the correct location without relying on fragile string matching.",
          "() Using replace_all on common patterns risks unintended modifications across multiple unrelated locations.",
          "() Blindly appending code can place the function in an incorrect location and break file structure or dependencies."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-105",
        "question": "You need to add a date validation check ensuring event dates are in the future. This requires adding a conditional statement to one existing function in a single file. What is the most appropriate approach?",
        "choices": [
          "Enter plan mode to analyze how the validation might impact other parts of the reservation flow",
          "Start with extended thinking mode enabled to ensure thorough reasoning about the validation logic",
          "Use direct execution to make the change",
          "Enter plan mode first to create a detailed implementation strategy before making the change"
        ],
        "correctIndex": 2,
        "explanation": "() Since this is a small, localized change (adding a single validation check inside one existing function in one file), it does not require broader architectural analysis or a multi-step plan. Direct execution is appropriate for quick, low-risk modifications.",
        "choiceExplanations": [
          "() This is unnecessary overhead for a simple, isolated validation change.",
          "() While reasoning is useful, extended planning modes are not needed for a straightforward conditional check.",
          "() Since this is a small, localized change (adding a single validation check inside one existing function in one file), it does not require broader architectural analysis or a multi-step plan. Direct execution is appropriate for quick, low-risk modifications.",
          "() Planning is better suited for multi-file or system-wide changes, not a single-function update."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-106",
        "question": "Your team's CLAUDE.md includes a rule: \"Use 4-space indentation and always run Prettier formatting.\" Despite this, code reviews reveal that roughly 30% of files Claude Code generates use inconsistent formatting — sometimes 2-space indentation, sometimes missing trailing commas. Adding emphasis (\"IMPORTANT: You MUST use Prettier formatting\") reduces violations to about 15%, but doesn't eliminate them. What is the most effective way to ensure all generated code is consistently formatted?",
        "choices": [
          "Extract the formatting rules into a dedicated skill that Claude loads automatically when generating code, with more detailed examples of correct formatting.",
          "Add a Stop hook with a prompt-based check that evaluates whether generated code follows formatting standards and prompts Claude to fix violations.",
          "Configure a Post ToolUse hook with an Edit|Write matcher that automatically runs Prettier on each file Claude modifies.",
          "Split the formatting rules into path-scoped .claude/rules/ files that load when Claude works on matching file types."
        ],
        "correctIndex": 2,
        "explanation": "() The most reliable way to enforce consistent formatting is to remove reliance on the model remembering rules and instead enforce formatting through an automatic post-processing step. A Post ToolUse hook that runs Prettier guarantees every modified file is formatted correctly, regardless of how the code was generated.",
        "choiceExplanations": [
          "() More instructions and examples improve compliance slightly but do not guarantee consistent formatting.",
          "() This adds extra reasoning cycles but is still LLM-dependent and not deterministic.",
          "() The most reliable way to enforce consistent formatting is to remove reliance on the model remembering rules and instead enforce formatting through an automatic post-processing step. A Post ToolUse hook that runs Prettier guarantees every modified file is formatted correctly, regardless of how the code was generated.",
          "() This improves organization but does not enforce formatting automatically or reliably."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-107",
        "question": "You've asked Claude Code to build a PDF report generation feature. The initial implementation queries the database correctly, but the output has formatting issues: table columns are too narrow causing content truncation, dates display without proper formatting, and page break handling is incorrect. You've noticed these issues interact — changing column widths affects how dates render, and page breaks depend on content height. What's the most effective approach for iterating toward a working solution?",
        "choices": [
          "Address the column width issue first with specific measurements, verify it works, then fix date formatting within the corrected columns, then adjust page breaks— testing after each change.",
          "Provide all three issues in a single detailed message with exact specifications for each, allowing Claude to address them together in one update.",
          "Show Claude an example of a correctly formatted report and ask it to match that output, rather than listing the specific technical issues.",
          "Start fresh with a detailed prompt specifying all formatting requirements upfront."
        ],
        "correctIndex": 0,
        "explanation": "() When issues are interdependent (layout, formatting, and pagination affecting each other), the most effective strategy is iterative isolation. Fixing one constraint at a time (starting with structural layout like column widths) prevents cascading side effects and makes it easier to understand what each change impacts before moving to the next issue.",
        "choiceExplanations": [
          "() When issues are interdependent (layout, formatting, and pagination affecting each other), the most effective strategy is iterative isolation. Fixing one constraint at a time (starting with structural layout like column widths) prevents cascading side effects and makes it easier to understand what each change impacts before moving to the next issue.",
          "() This can lead to unstable results because multiple interacting constraints are modified at once, making debugging harder.",
          "() Example-based prompting helps, but it does not resolve underlying structural dependencies in layout logic.",
          "() Restarting loses iteration context and still doesn’t address the need for step-by-step validation of interdependent issues."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-108",
        "question": "You're implementing a caching layer for API responses to speed up the /products endpoint. You have a rough idea —Redis with a 5-minute TTL—but you're new to production caching and aren't sure what other considerations a robust implementation requires. What's the most effective way to start your iterative workflow?",
        "choices": [
          "Ask Claude to interview you about the caching requirements before implementing, surfacing considerations like invalidation strategies, cache layers, consistency guarantees, and failure modes.",
          "Use plan mode to analyze the current/products endpoint implementation, then provide your caching requirements once Claude explains how the existing code is structured.",
          "Start with a minimal request: \"Add Redis caching to/products with 5-minute TTL.\" Add features and fix issues through follow-up prompts as problems surface during testing.",
          "Write a specification with your known requirements and \"TBD\" markers for uncertain areas, having Claude propose solutions for each TBD as it implements."
        ],
        "correctIndex": 0,
        "explanation": "() When you’re unsure about production-grade caching design, the most effective starting point is to first surface missing requirements and constraints. An interactive clarification step helps uncover critical considerations like cache invalidation, stale data handling, consistency models, key design, TTL trade-offs, and failure modes before any implementation begins. This leads to a more robust and less error-prone design.",
        "choiceExplanations": [
          "() When you’re unsure about production-grade caching design, the most effective starting point is to first surface missing requirements and constraints. An interactive clarification step helps uncover critical considerations like cache invalidation, stale data handling, consistency models, key design, TTL trade-offs, and failure modes before any implementation begins. This leads to a more robust and less error-prone design.",
          ") Understanding the endpoint is useful, but jumping into code analysis before clarifying caching requirements can miss key architectural decisions.",
          ") This reactive approach often leads to brittle caching logic and repeated rework.",
          "() While structured, it still assumes you already know what to specify, which is not true in this scenario."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-109",
        "question": "You're implementing a complex graph traversal algorithm with specific performance requirements and edge cases to handle (disconnected nodes, cycles, weighted edges). You want to structure your workflow for efficient iterative refinement with Claude. What approach will most effectively enable progressive improvement across multiple iterations?",
        "choices": [
          "Write a test suite covering expected behavior, edge cases, and performance requirements before implementation. Ask Claude to write code that passes the tests, then iterate by sharing test failures with each refinement request.",
          "Provide Claude with a detailed natural language specification of the algorithm, including all requirements and edge cases. Review each output manually and provide descriptive feedback on what behavior needs to change.",
          "Provide Claude with a reference implementation from documentation, then ask it to rewrite the code to match your codebase style and add the required edge case handling, comparing outputs against the reference.",
          "Have Claude extensively research the algorithm and create a detailed implementation plan using extended thinking, then implement the complete solution based on that plan."
        ],
        "correctIndex": 0,
        "explanation": "() For a complex graph traversal problem with edge cases like cycles, disconnected nodes, and weighted edges, the most effective workflow is test-driven iteration. Defining a test suite upfront creates a precise correctness target, ensures all edge cases are explicitly covered, and allows each iteration to be validated objectively. This reduces ambiguity and makes progressive refinement efficient and measurable.",
        "choiceExplanations": [
          "() For a complex graph traversal problem with edge cases like cycles, disconnected nodes, and weighted edges, the most effective workflow is test-driven iteration. Defining a test suite upfront creates a precise correctness target, ensures all edge cases are explicitly covered, and allows each iteration to be validated objectively. This reduces ambiguity and makes progressive refinement efficient and measurable.",
          "() This relies too heavily on subjective interpretation and manual review, making iteration slower and less precise than test-driven validation.",
          "() A reference implementation helps, but it does not guarantee correctness for custom edge cases or performance constraints.",
          "() Planning is useful, but without executable tests, correctness across iterations is harder to validate and refine."
        ],
        "difficulty": "medium"
      },
      {
        "id": "coding-110",
        "question": "Your team is configuring MCP servers in Claude Code. You want to add a shared venue lookup server that all team members should have access to, and you personally want to add an experimental music playlist server that only you are testing. Which configuration approach correctly applies MCP server scopes?",
        "choices": [
          "Add venue server to .mcp.json and playlist server to ~/.claude.json",
          "Add both servers to the project-level .mcp.json file",
          "Add venue server to ~/.claude.json and playlist server to .mcp.json",
          "Add both servers to your local ~/.claude.json"
        ],
        "correctIndex": 0,
        "explanation": "() Project-level configuration (.mcp.json) is used for shared team servers, ensuring everyone working in the repository has access to the same MCP tools (like the venue lookup server). User-level configuration (~/.claude.json) is used for personal or experimental servers, such as a music playlist server that only you want to test locally.",
        "choiceExplanations": [
          "() Project-level configuration (.mcp.json) is used for shared team servers, ensuring everyone working in the repository has access to the same MCP tools (like the venue lookup server). User-level configuration (~/.claude.json) is used for personal or experimental servers, such as a music playlist server that only you want to test locally.",
          "() This would expose the experimental playlist server to the entire team, which is not intended.",
          "() This reverses the correct scoping: shared tools should not be user-only, and experimental tools should not be project-wide.",
          "() This would prevent the team from accessing the shared venue server, breaking collaboration."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-111",
        "question": "Your infrastructure-as-code repository includes Terraform modules (/terraform/), Kubernetes manifests (/kubernetes/), and CI/CD pipeline scripts (/pipelines/). Each requires different conventions, but your single root CLAUDE.md has grown to 500+ lines. When developers work on Kubernetes files, Terraform-specific rules load into context unnecessarily, consuming tokens. What is the best approach to reorganize so only relevant guidance loads when editing specific file types?",
        "choices": [
          "Restructure the root CLAUDE.md into clearly labeled sections with headers (e.g., \"## Terraform Conventions\"), improving organization and readability.",
          "Split content into subdirectory CLAUDE.md files (/terraform/CLAUDE.md, /kubernetes/CLAUDE.md), so Claude loads directory-specific guidance.",
          "Keep the root CLAUDE.md and use @path/to/import syntax to modularly include tool-specific guidance files from separate documents.",
          "Create files in .claude/rules/ with YAML frontmatter path-scoping (e.g., paths: [\"terraform/**/*\"]), loading rules only when editing matching files."
        ],
        "correctIndex": 3,
        "explanation": "() This approach enables context-aware rule loading, ensuring that only relevant guidance is injected based on the files being edited. Terraform rules apply only in /terraform, Kubernetes rules only in /kubernetes, and CI/CD rules only in /pipelines, which significantly reduces unnecessary token usage while keeping governance precise and scalable.",
        "choiceExplanations": [
          "() This improves readability but does not solve the core issue of unnecessary context loading.",
          "() While modular, it does not guarantee selective loading based on file type or path matching.",
          "() This still risks pulling unrelated context into memory even when it is not needed.",
          "() This approach enables context-aware rule loading, ensuring that only relevant guidance is injected based on the files being edited. Terraform rules apply only in /terraform, Kubernetes rules only in /kubernetes, and CI/CD rules only in /pipelines, which significantly reduces unnecessary token usage while keeping governance precise and scalable."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-112",
        "question": "Your team frequently migrates React components to Vue. You've written a step-by-step workflow for Claude Code to follow during each migration, and you want every developer on the team to invoke it by typing /migrate-component. The workflow should stay in sync as the team iterates on it. Where should you place the skill file?",
        "choices": [
          "In ~/.claude/skills/migrate-component/SKILL.md on each developer's machine",
          "In the project's .claude/settings.json using a skillOverrides entry to register and define the workflow",
          "In .claude/skills/migrate-component/SKILL.md at the project root, committed to version control",
          "As a detailed instruction block in the project's root CLAUDE.md file"
        ],
        "correctIndex": 2,
        "explanation": "() A shared team workflow like /migrate-component should live in the project-level skills directory under version control. This ensures: Every developer automatically gets the same workflow Updates are tracked via git The skill stays consistent and evolves with the codebase The /migrate-component command is available project-wide",
        "choiceExplanations": [
          "() This makes the workflow local and inconsistent across the team, and it won’t stay in sync.",
          ") Settings files are for configuration, not defining reusable workflow skills.",
          "() A shared team workflow like /migrate-component should live in the project-level skills directory under version control. This ensures: Every developer automatically gets the same workflow Updates are tracked via git The skill stays consistent and evolves with the codebase The /migrate-component command is available project-wide",
          "() CLAUDE.md is for general guidance, not structured, reusable slash-command skills."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-113",
        "question": "A critical bug is affecting production users. Error logs show exceptions in the OrderProcessing module with a clear stack trace pointing to a specific function. You haven't worked with this module before. What's the most effective approach?",
        "choices": [
          "Start with direct execution to gather initial information, then switch to plan mode to design a comprehensive solution before implementing any changes.",
          "Use plan mode to analyze the error in context of the module's design, enumerate potential root causes, and prioritize fixes systematically.",
          "Enter plan mode to explore the module's architecture and dependencies before attempting any fixes.",
          "Use direct execution to examine the stack trace, read the relevant code, and implement a fix once you identify the root cause."
        ],
        "correctIndex": 3,
        "explanation": "() Since the issue already has a clear stack trace pointing to a specific function, the fastest and most effective approach is to directly investigate the referenced code path, understand the failure, and apply a targeted fix. This minimizes overhead and is appropriate when the failure location is already well-identified.",
        "choiceExplanations": [
          "() This adds unnecessary planning overhead for a bug that already has a clearly identified source.",
          "() Over-analysis is unnecessary because the stack trace already localizes the issue.",
          "() Architecture-level exploration is too broad for a clearly localized production bug.",
          "() Since the issue already has a clear stack trace pointing to a specific function, the fastest and most effective approach is to directly investigate the referenced code path, understand the failure, and apply a targeted fix. This minimizes overhead and is appropriate when the failure location is already well-identified."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-114",
        "question": "You're implementing a new payment processing module that must follow your project's established patterns for database transactions, error handling, and audit logging. You've identified three existing modules that exemplify these patterns: db_utils.py, error_handlers.py, and audit_logger.py. This is a one-off integration task—these patterns are well-documented in your team wiki and don't need additional project-level documentation. What's the most effective approach?",
        "choices": [
          "Describe the patterns from the three modules in natural language in your prompt, explaining the transaction handling approach, error format, and logging conventions Claude should follow.",
          "Use @references to include the three modules directly in your prompt, giving Claude concrete code examples of the patterns to follow.",
          "Ask Claude to explore your codebase to find and understand the transaction, error handling, and logging patterns before generating the new module.",
          "Add documentation of each pattern to your CLAUDE.md file, establishing them as project conventions that Claude will apply automatically."
        ],
        "correctIndex": 1,
        "explanation": "() For a one-off implementation that must strictly follow existing patterns, the most effective approach is to provide direct, concrete code references. Including db_utils.py, error_handlers.py, and audit_logger.py ensures Claude can accurately replicate transaction handling, error formats, and logging conventions without relying on abstraction or interpretation.",
        "choiceExplanations": [
          "() Natural language descriptions are prone to ambiguity and may miss subtle implementation details present in the actual code.",
          "() For a one-off implementation that must strictly follow existing patterns, the most effective approach is to provide direct, concrete code references. Including db_utils.py, error_handlers.py, and audit_logger.py ensures Claude can accurately replicate transaction handling, error formats, and logging conventions without relying on abstraction or interpretation.",
          "() While exploration helps, it is less precise and less reliable than explicitly providing the canonical examples.",
          "() This is unnecessary overhead for a one-off task and does not guarantee accurate replication of nuanced implementation details."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-115",
        "question": "You've asked Claude to write a data migration script, but the initial output doesn't correctly handle records with null values in required fields. What's the most effective way to iterate toward a working solution?",
        "choices": [
          "Provide a test case with example input containing null values and the expected output, then ask Claude to fix it.",
          "Manually edit the generated code to fix the null handling, then continue working with Claude on other parts.",
          "Describe the null value problem in detail and ask Claude to regenerate the entire script with improved edge case handling.",
          "Add \"think harder about edge cases\" to your prompt and request a complete rewrite of the migration logic."
        ],
        "correctIndex": 0,
        "explanation": "() The most effective iterative approach is to make the failure explicit and verifiable. By providing concrete input/output examples for null-handling edge cases, you give a precise contract for the expected behavior. This allows Claude to adjust the implementation accurately and testably, rather than relying on vague descriptions or full rewrites.",
        "choiceExplanations": [
          "() The most effective iterative approach is to make the failure explicit and verifiable. By providing concrete input/output examples for null-handling edge cases, you give a precise contract for the expected behavior. This allows Claude to adjust the implementation accurately and testably, rather than relying on vague descriptions or full rewrites.",
          "() Manual fixes break the iterative feedback loop and make it harder for Claude to learn from structured correction signals.",
          "() Regenerating the full script is inefficient and risks introducing regressions in already correct parts of the logic.",
          "() This is too vague and does not provide actionable guidance or measurable correctness criteria."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-116",
        "question": "You've documented API error handling conventions in a CLAUDE.md file at your project root, specifying that endpoint handlers should use a custom ApiError class. After several sessions, you notice Claude Code sometimes follows these conventions and sometimes uses generic try/catch blocks with string messages. The inconsistency appears random across different coding sessions. What's the most efficient first diagnostic step?",
        "choices": [
          "Add more detailed code examples to your CLAUDE.md showing the exact ApiError usage pattern for different endpoint types.",
          "Run /memory to check which memory files are loaded and verify your CLAUDE.md is included.",
          "Search for conflicting instructions in ~/.claude/CLAUDE.md or ~/.claude/rules/ that might override your project conventions.",
          "Create path-specific rules in claude/rules/handlers.md with YAML frontmatter scoping the error handling instructions to your API handler files."
        ],
        "correctIndex": 1,
        "explanation": "() The first and most efficient diagnostic step is to confirm whether the expected project-level context is actually being loaded. Since behavior is inconsistent across sessions, the most likely issue is not the rule content itself but context loading or memory inclusion. Checking /memory verifies whether CLAUDE.md and other relevant rules are being applied in the current session.",
        "choiceExplanations": [
          "() This addresses rule clarity, but the issue is not necessarily lack of detail—it may be missing or conflicting context.",
          "() The first and most efficient diagnostic step is to confirm whether the expected project-level context is actually being loaded. Since behavior is inconsistent across sessions, the most likely issue is not the rule content itself but context loading or memory inclusion. Checking /memory verifies whether CLAUDE.md and other relevant rules are being applied in the current session.",
          "() This is a valid next step, but premature before confirming whether the project rules are even being loaded.",
          "() This is a structural fix, not a diagnostic step. You should first identify why the inconsistency is happening."
        ],
        "difficulty": "medium"
      },
      {
        "id": "coding-117",
        "question": "Your monorepo contains shared coding standards in /docs/standards/security-rules.md (for services handling user data), testing-patterns.md (for all packages), and api-conventions.md (for API-facing services). Your 15 packages are organized by feature domain (/packages/auth/, /packages/billing/, /packages/notifications/, etc.) without naming conventions indicating which handle user data or expose APIs. Package maintainers are expected to configure their own local development settings, as they understand their package's domain requirements. Currently, all package CLAUDE.md files duplicate all three standards, applying irrelevant guidance. What's the most effective approach?",
        "choices": [
          "Create claude/rules/ files for each standard with YAML frontmatter paths listing every package directory where that standard should apply.",
          "Create a shared-standards.nd that uses @imports to combine all three standards, then have each package's CLAUDE.md import that combined file.",
          "Put all standards in the root CLAUDE.md with override instructions like \"ignore security-rules.md when working in packages that don't handle user data.\"",
          "Use @imports in each package's CLAUDE.md to reference only the specific standard files relevant to that package, based on the maintainer's domain knowledge."
        ],
        "correctIndex": 3,
        "explanation": "() Since the package structure does not inherently indicate which standards apply, and maintainers are expected to understand their package's requirements, the most effective approach is for each package's CLAUDE.md to import only the relevant standards. This eliminates duplication, keeps guidance targeted, and avoids loading irrelevant instructions while leveraging the maintainers' domain expertise.",
        "choiceExplanations": [
          ") This requires centrally maintaining package-to-standard mappings, which is difficult when applicability depends on domain knowledge rather than directory structure.",
          ") This continues loading irrelevant standards into every package, which is the problem being solved.",
          "() This increases context size and complexity, forcing Claude to process and ignore unnecessary guidance rather than loading only what is needed.",
          "() Since the package structure does not inherently indicate which standards apply, and maintainers are expected to understand their package's requirements, the most effective approach is for each package's CLAUDE.md to import only the relevant standards. This eliminates duplication, keeps guidance targeted, and avoids loading irrelevant instructions while leveraging the maintainers' domain expertise."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-121",
        "question": "After deploying automated code review, developers report that approximately 35% of flagged findings are false positives falling into consistent patterns: style suggestion contradicting team conventions, security warnings for patterns safe in your deployment context, and performance suggestions that would degrade your specific use ca. You want to reduce false positives while maintaining the ability to catch genuine issues. Which approach best enables the model to generalize its judgment to novel co patterns it hasn't seen before?",
        "choices": [
          "Include few-shot examples in your prompt showing annotated code snippets that distinguish acceptable patterns from genuine issues in each category.",
          "Implement post-processing that uses keyword matching to filter out findings containing terms like \"convention,\" \"context-dependent,\" or \"trade-off.\"",
          "Add instructions to your system prompt to \"be conservative,\" \"only flag definite issues,\" and \"consider that some patterns may be intentional.\"",
          "Create a comprehensive written specification of all patterns that should not be flagged, then include this full documentation in the system prompt."
        ],
        "correctIndex": 0,
        "explanation": "() Few-shot examples teach the model the underlying distinctions between acceptable and problematic patterns, allowing it to generalize to new, unseen code scenarios. By demonstrating how team conventions, deployment-specific security considerations, and performance trade-offs should be evaluated, the model learns the decision-making criteria rather than memorizing specific cases. This is the most effective approach for reducing systematic false positives while preserving the ability to identify genuine issues.",
        "choiceExplanations": [
          "() Few-shot examples teach the model the underlying distinctions between acceptable and problematic patterns, allowing it to generalize to new, unseen code scenarios. By demonstrating how team conventions, deployment-specific security considerations, and performance trade-offs should be evaluated, the model learns the decision-making criteria rather than memorizing specific cases. This is the most effective approach for reducing systematic false positives while preserving the ability to identify genuine issues.",
          "() Keyword filtering is brittle and may suppress legitimate findings that happen to contain those terms while failing to address the root cause of incorrect model reasoning.",
          "() General instructions may reduce the number of findings but do not provide enough contextual guidance for distinguishing acceptable patterns from genuine issues, especially in novel situations.",
          "() A long list of rules is difficult for the model to apply consistently and may not help it generalize to new patterns. Examples are typically more effective at teaching nuanced judgment than exhaustive documentation alone."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-124",
        "question": "Your code review prompts include both implementation changes and the corresponding test file, but the LLM's review comments fail to point out untested code paths. Analysis reveals the model correctly flags functions that have no tests at all, but fails to identify when conditional branches or error-handling paths within tested functions that have no tests at all, but fails to identify when conditional branches or error-handling paths within tested functio lack coverage. What's the most effective way to improve detection of branch-level coverage gaps without overcomplicating the pipeline?",
        "choices": [
          "Implement a multi-pass pipeline where separate LLM calls first extract all conditional branches, then cross-reference each against test assertions in a second pass.",
          "Include few-shot examples showing code with an uncovered branch paired with the review comment identifying the specific missing test case.",
          "Add explicit instructions directing the model to enumerate each conditional branch and exception path, then verify each has a corresponding test assertion.",
          "Restructure the prompt to interleave implementation and tests, presenting each function followed immediately by its test cases"
        ],
        "correctIndex": 1,
        "explanation": "() Few-shot examples are the most effective way to improve the model's ability to recognize branch-level test coverage gaps and generalize that reasoning to new code. By demonstrating examples where conditional branches or error-handling paths are untested—and showing the expected review comments—the model learns the pattern it should look for during review without adding significant pipeline complexity.",
        "choiceExplanations": [
          ") This may improve accuracy but substantially increases system complexity, latency, and cost. The question asks for improvement without overcomplicating the pipeline.",
          "() Few-shot examples are the most effective way to improve the model's ability to recognize branch-level test coverage gaps and generalize that reasoning to new code. By demonstrating examples where conditional branches or error-handling paths are untested—and showing the expected review comments—the model learns the pattern it should look for during review without adding significant pipeline complexity.",
          "() Instructions can help, but they are generally less effective than examples at teaching nuanced reasoning patterns such as identifying branch-level coverage gaps.",
          ". () Improving code-test proximity may aid review, but it does not directly teach the model how to identify missing coverage for specific branches or error paths."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-125",
        "question": "After deploying the automated review, you notice high precision but low recall - real bugs are slipping through undetected. Investigation reveals your review prompt instructs Claude to \"only report high-confidence issues you are certain about\" and \"err on the side of not commenting.\" Developers appreciate the low noise, but a race condition that caused a production outage was visible in a reviewed PR and went unreported. You need to substantially improve bug detection while keeping false positive rates manageable for your team. What is the most effective approach?",
        "choices": [
          "Expand the context window by including related test files, recent git history, and the module's dependency graph alongside the diff, giving Claude richer signals to assess issue severity.",
          "Remove the conservative filtering instructions and prompt Claude to report all potential issues, then apply a programmatic filter to deduplicate and suppress categories that historically generate false positives.",
          "Split the review into a finding stage where Claude's goal is coverage - flagging every potential issue with confidence and severity metadata - and a separate thresholds those findings.",
          "Add detailed few-shot examples demonstrating bug categories Claude should flag - race conditions, null dereferences, error handling gaps - while keeping confidence filtering instruction to maintain current precision levels."
        ],
        "correctIndex": 2,
        "explanation": "Split the review into a finding stage where Claude's goal is coverage—flagging every potential issue with confidence and severity metadata—and a separate filtering stage that applies team-specific thresholds to those findings. () The core problem is that the prompt's conservative filtering instructions are suppressing recall, causing genuine bugs (such as the race condition) to go unreported. Separating issue detection from issue filtering is the most effective solution: Stage 1 (Detection): Maximize recall by identifying all plausible issues and assigning confidence/severity scores. Stage 2 (Filtering): Apply team-specific thresholds to control noise and maintain manageable false-positive rates. This architecture avoids forcing the model to simultaneously optimize for both recall and precision, which often leads to missed bugs.",
        "choiceExplanations": [
          "() More context can help in some cases, but it does not address the primary issue: the prompt explicitly tells Claude to suppress anything it is not certain about.",
          "() This improves recall but relies on coarse category-level filtering rather than evaluating each finding's confidence and severity. It is less flexible and effective than a dedicated detection-and-filtering pipeline.",
          "Split the review into a finding stage where Claude's goal is coverage—flagging every potential issue with confidence and severity metadata—and a separate filtering stage that applies team-specific thresholds to those findings. () The core problem is that the prompt's conservative filtering instructions are suppressing recall, causing genuine bugs (such as the race condition) to go unreported. Separating issue detection from issue filtering is the most effective solution: Stage 1 (Detection): Maximize recall by identifying all plausible issues and assigning confidence/severity scores. Stage 2 (Filtering): Apply team-specific thresholds to control noise and maintain manageable false-positive rates. This architecture avoids forcing the model to simultaneously optimize for both recall and precision, which often leads to missed bugs.",
          ") Examples may help identify more bug patterns, but the conservative instructions would still suppress many findings, leaving the recall problem largely unresolved."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-126",
        "question": "Your automated reviewer uses a single prompt covering security issues, API design, and business logic correctness. Your evaluation suite shows strong recall findings (82%) but poor recall for business logic edge cases in quiz scoring (34%). When you add few-shot examples of logic bugs to the prompt, logic recall is 41% but API design recall drops to 68%. How should you address this trade-off to improve detection across both categories?",
        "choices": [
          "Split the review into separate focused prompts - one for security and API design, another for business logic - each with dedicated examples, then combine findings before posting.",
          "Upgrade to a more capable model tier, since its stronger reasoning will handle both concern types in a single prompt and eliminate the recall trade-off.",
          "Provide the full repository as context instead of just the changed files and surrounding code, giving the model deeper visibility into business logic.",
          "Replace the few-shot examples with a detailed checklist of specific logic edge cases to verify, such as division-by-zero in score calculation or grading thresholds."
        ],
        "correctIndex": 0,
        "explanation": "() The results show a classic prompt-capacity trade-off: adding business-logic examples improves logic recall but reduces API design recall. By separating concerns into specialized review passes, each prompt can focus on its domain with targeted instructions and examples without competing for attention or context. The findings can then be merged into a single review output, improving overall recall across categories.",
        "choiceExplanations": [
          "() The results show a classic prompt-capacity trade-off: adding business-logic examples improves logic recall but reduces API design recall. By separating concerns into specialized review passes, each prompt can focus on its domain with targeted instructions and examples without competing for attention or context. The findings can then be merged into a single review output, improving overall recall across categories.",
          "() A stronger model may help, but it does not fundamentally solve the prompt specialization problem. The trade-off can still persist when multiple review objectives compete within one prompt.",
          "() More context increases cost and complexity and may even dilute attention. The observed issue stems from balancing multiple review goals, not a lack of repository-wide context.",
          "() Checklists can help for known cases but are less effective than dedicated, specialized review passes. They also do not address the underlying competition between business-logic and API-design review objectives within a single prompt."
        ],
        "difficulty": "medium"
      },
      {
        "id": "coding-133",
        "question": "Your agent has analyzed a complex service module—reading 23 source files, tracing request flows, and identifying error handling patterns. A developer needs to develop two testing strategies before committing to one: end-to-end tests with mocked external services vs. snapshot tests capturing expected outputs. The developer needs to independently develop both approaches to evaluate trade-offs. How should you manage the sessions?",
        "choices": [
          "Resume the analysis session with fork_session enabled, creating a separate branch for each testing strategy.",
          "Export the analysis session's key findings to a file, then create two new sessions that reference this file.",
          "Continue in the original session, developing end-to-end tests first, then snapshot tests sequentially.",
          "Start two fresh sessions, having each re-read the relevant source files before beginning."
        ],
        "correctIndex": 0,
        "explanation": "() Forking the session is the most effective way to support parallel, independent exploration while preserving the full analysis context in-memory. Since the agent has already completed a heavy analysis phase (23 source files, request flows, error handling), that state should not be recomputed or exported—it should be reused directly. With fork_session, each branch inherits the same authoritative context and can independently explore end-to-end tests vs snapshot tests without interference, ordering bias, or redundant reprocessing. This makes it ideal for evaluating trade-offs under identical starting conditions.",
        "choiceExplanations": [
          "() Forking the session is the most effective way to support parallel, independent exploration while preserving the full analysis context in-memory. Since the agent has already completed a heavy analysis phase (23 source files, request flows, error handling), that state should not be recomputed or exported—it should be reused directly. With fork_session, each branch inherits the same authoritative context and can independently explore end-to-end tests vs snapshot tests without interference, ordering bias, or redundant reprocessing. This makes it ideal for evaluating trade-offs under identical starting conditions.",
          "() This introduces unnecessary serialization and reconstruction overhead. It also risks losing subtle contextual relationships present in the live session state.",
          "() Sequential execution prevents independent evaluation and introduces bias from the order of exploration.",
          "() This wastes computation by repeating the expensive 23-file analysis instead of reusing already established context."
        ],
        "difficulty": "medium"
      },
      {
        "id": "coding-135",
        "question": "An engineer used the agent yesterday to analyze a legacy authentication module, identifying two distinct refactoring approaches: extracting a microservice versus refactoring in-place. Today, they want to explore both approaches in depth—having the agent propose specific code changes for each—before deciding which to implement. What's the most effective way to structure this exploration?",
        "choices": [
          "Use fork_session to create two branches from yesterday's analysis, exploring one approach in each fork.",
          "Resume yesterday's session and explore both approaches sequentially within the same conversation thread.",
          "Resume yesterday's session to explore the first approach, then start a new session for the second, manually recreating the original context.",
          "Start two fresh sessions, manually providing a summary of yesterday's analysis findings to establish context."
        ],
        "correctIndex": 1,
        "explanation": ") This preserves full historical context from the original analysis while allowing structured, step-by-step comparison of both refactoring strategies. Since both approaches depend on the same prior findings, keeping them in one session ensures consistency, reduces duplication, and makes trade-off evaluation easier.",
        "choiceExplanations": [
          "() Forking is best when you need parallel exploration of competing directions without shared context. In this case, both refactoring approaches are being evaluated from the same analytical baseline and are meant to be compared within a single continuous reasoning flow. Forking adds unnecessary fragmentation.",
          ") This preserves full historical context from the original analysis while allowing structured, step-by-step comparison of both refactoring strategies. Since both approaches depend on the same prior findings, keeping them in one session ensures consistency, reduces duplication, and makes trade-off evaluation easier.",
          "() This introduces avoidable overhead and risks inconsistencies when manually reconstructing context. It also breaks continuity, making it harder to directly compare the two approaches under identical assumptions.",
          "() This is the least efficient option. It relies entirely on manual summarization, which can omit important details and lead to context drift. It also duplicates effort and reduces reliability compared to continuing the original session."
        ],
        "difficulty": "medium"
      },
      {
        "id": "coding-136",
        "question": "An engineer asks your agent to add comprehensive tests to a legacy codebase with 200 files and minimal existing test coverage. The engineer hasn't spent much time on the codebase, so they ask for help identifying which modules to prioritize. How should the agent decompose this open-ended task?",
        "choices": [
          "Use Glob and Grep to map codebase structure, identify heavily-coupled modules, create a prioritized plan for high-impact areas, and revise as dependencies are discovered.",
          "Create a fixed testing schedule upfront based on directory structure, allocating equal effort to each top-level directory regardless of code complexity or importance.",
          "Systematically read all 200 files to create a complete function inventory before writing any tests, ensuring the testing plan accounts for everything from the beginning.",
          "Start writing tests for the first module alphabetically, using test failures and imports to discover related files organically."
        ],
        "correctIndex": 0,
        "explanation": "() This is the most effective decomposition strategy because it uses lightweight exploration tools first to understand structure and coupling, then prioritizes testing based on impact and dependency density. It is iterative and adapts as new relationships between modules are discovered, which is essential in large, poorly tested codebases.",
        "choiceExplanations": [
          "() This is the most effective decomposition strategy because it uses lightweight exploration tools first to understand structure and coupling, then prioritizes testing based on impact and dependency density. It is iterative and adapts as new relationships between modules are discovered, which is essential in large, poorly tested codebases.",
          "() This ignores differences in module complexity, risk, and coupling. Treating all directories equally leads to inefficient allocation of testing effort and misses high-risk areas that need deeper coverage.",
          "() While thorough, this is not scalable and delays actual testing work. It front-loads too much analysis and defeats the purpose of incremental discovery, especially in large legacy systems.",
          "() This is an unstructured and arbitrary approach. Alphabetical ordering has no relation to system importance or dependency structure, so it risks focusing effort on low-impact areas first and missing critical modules early."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-137",
        "question": "Your automated review calls the Claude API for each PR, using tool_use with a report_findings tool that returns a JSON array of finding objects (each with file_path, line_number, severity, category, and description). During testing on a large PR touching 30+ files, the response hits the max_tokens limit and the output is truncated mid-JSON, causing your pipeline's parser to fail. What is the most effective way to handle this?",
        "choices": [
          "Increase max_tokens to the model's maximum and instruct Claude to keep finding descriptions under 50 words each.",
          "Switch from tool_use to prompting Claude to return findings as a markdown list.",
          "Split the review into multiple API calls that each analyze a subset of the changed files, then merge the resulting findings arrays.",
          "Add retry logic that detects truncated JSON and re-sends the request with instructions to report only critical and high severity findings."
        ],
        "correctIndex": 2,
        "explanation": "Breaking the PR into smaller batches keeps each JSON response within token limits, preventing truncation and ensuring valid, parseable output.",
        "choiceExplanations": [
          "May reduce truncation but does not guarantee the response will fit.",
          "Loses structured output and still does not solve token limit issues.",
          "Breaking the PR into smaller batches keeps each JSON response within token limits, preventing truncation and ensuring valid, parseable output.",
          "Produces incomplete reviews by omitting lower-severity findings."
        ],
        "difficulty": "medium"
      },
      {
        "id": "coding-138",
        "question": "You are setting up a non-interactive automated code review pipeline using Claude Code. You want Claude to analyze a pulled Git diff (git diff) against the main branch and apply a custom set of code review instructions. However, you notice that when you run the pipeline, Claude only looks at the raw diff text itself and completely stops using its file-reading or code navigation tools. As a result, it fails to inspect the broader codebase repository context, which is critical because the diff modifies a core function called by many other external modules. Which change to the CLI invocation will cause Claude to read related files in the repository while still successfully applying your custom review instructions?",
        "choices": [
          "Replace --system-prompt with --append-system-prompt so your review instructions are added to Claude Code's default prompt instead of overwriting the built-in guidance for using file-reading and code navigation tools.",
          "Keep --system-prompt and add --allowedTools \"Read, Glob, Grep\" so that the non-interactive mode permits file system tools that it otherwise disables.",
          "Stop piping the diff via stdin and instead embed the diff contents inside the prompt string, so Claude Code treats the invocation as an agentic session rather than a stream-processing one.",
          "Remove --system-prompt entirely and place the review instructions in a CLAUDE.md file at the repo root, since --system-prompt is incompatible with tool use under -p."
        ],
        "correctIndex": 0,
        "explanation": "--system-prompt replaces Claude Code's default system instructions, which include guidance for using file-reading and code navigation tools. --append-system-prompt preserves those built-in instructions while adding your custom review rules, allowing Claude to inspect related repository files.",
        "choiceExplanations": [
          "--system-prompt replaces Claude Code's default system instructions, which include guidance for using file-reading and code navigation tools. --append-system-prompt preserves those built-in instructions while adding your custom review rules, allowing Claude to inspect related repository files.",
          "Tools may be permitted, but replacing the default system prompt can remove the instructions that tell Claude to use them.",
          "Changing how the diff is provided does not restore the missing tool-use guidance.",
          "--system-prompt is not inherently incompatible with tool use; the issue is overwriting the default prompt."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-139",
        "question": "Your development team is using Claude Code to automate test generation across a large codebase. However, developers are frequently rejecting the generated test suites because Claude creates a high volume of trivial assertions or tests that merely maximize line coverage without validating meaningful behavioral logic or edge cases. You want to guide Claude to generate high-quality, production-ready tests directly without introducing high latency or modifying the core pipeline script. Which strategy best ensures that high-quality, meaningful tests are generated in the first place?",
        "choices": [
          "Restrict test generation to directories where historical quality metrics show higher acceptance rates, disabling it for areas where generated tests consistently require heavy editing.",
          "Add post-generation coverage analysis that automatically filters out any generated test that doesn't increase line coverage beyond what existing tests provide.",
          "Document testing standards in CLAUDE.md including valuable test criteria, available fixtures with intended use cases, and examples distinguishing meaningful behavioral tests from trivial assertions.",
          "Implement a two-phase generation where a second Claude call scores each test against quality criteria, filtering out low-scoring tests before presenting results to developers."
        ],
        "correctIndex": 2,
        "explanation": "CLAUDE.md provides persistent guidance that shapes test generation from the start. By documenting quality standards, fixtures, and examples of meaningful behavioral tests, Claude is more likely to generate production-ready tests that validate logic and edge cases instead of chasing line coverage.",
        "choiceExplanations": [
          "Limits where tests are generated but does not improve test quality.",
          "Coverage increases do not guarantee meaningful or high-quality tests.",
          "CLAUDE.md provides persistent guidance that shapes test generation from the start. By documenting quality standards, fixtures, and examples of meaningful behavioral tests, Claude is more likely to generate production-ready tests that validate logic and edge cases instead of chasing line coverage.",
          "Can filter poor tests but adds latency and modifies the pipeline, which the requirements explicitly avoid."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-140",
        "question": "A developer uses Claude Code to refactor a function during their development session. Before committing, they ask the same Claude session to review the code for issues. Later, a separate automated CI review catches several bugs that the same-session review missed. What best explains this discrepancy?",
        "choices": [
          "The CI environment has access to the full codebase context while the local session only sees the current file",
          "The CI review uses a more specific prompt tailored for catching bugs, while the developer's request was too general",
          "Claude retains context about its prior reasoning in the session, making it less likely to question its own decisions",
          "The extended session length caused the context window to fill with conversation history, leaving less room for thorough analysis"
        ],
        "correctIndex": 2,
        "explanation": ". Why C is correct: When Claude reviews code in the same session where it created or refactored the code, it retains its earlier reasoning and assumptions. This can lead to confirmation bias, making it less likely to critically re-evaluate its own changes. A fresh CI review starts with no prior attachment to those decisions and may identify issues that the same-session review misses.",
        "choiceExplanations": [
          "Local sessions can also access the codebase using file-reading and navigation tools; this is not the primary reason for the discrepancy.",
          "Prompt quality can affect results, but the key issue described is reviewing code within the same session that generated it.",
          ". Why C is correct: When Claude reviews code in the same session where it created or refactored the code, it retains its earlier reasoning and assumptions. This can lead to confirmation bias, making it less likely to critically re-evaluate its own changes. A fresh CI review starts with no prior attachment to those decisions and may identify issues that the same-session review misses.",
          "Long conversations may affect context management, but this is not the main explanation for missing bugs that a fresh review catches."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-141",
        "question": "Your automated reviewer uses a single prompt covering security issues, API design, and business logic correctness. Your evaluation suite shows strong recall for API design findings (82%) but poor recall for business logic edge cases in quiz scoring (34%). When you add few-shot examples of logic bugs to the prompt, logic recall improves to 41% but API design recall drops to 68%. How should you address this trade-off to improve detection across both categories?",
        "choices": [
          "Split the review into separate focused prompts — one for security and API design, another for business logic — each with dedicated examples, then consolidate findings before posting.",
          "Replace the few-shot examples with a detailed checklist of specific logic edge cases to verify, such as division-by-zero In score calculations and boundary conditions in grading thresholds.",
          "Upgrade to a more capable model tier, since its stronger reasoning will handle both concern types in a single prompt and eliminate the recall trade-off."
        ],
        "correctIndex": 0,
        "explanation": "Combining multiple review objectives in a single prompt creates context competition, where adding examples for one category can reduce performance in another. Separate, focused prompts allow each review type to have its own instructions and examples, improving recall across categories without sacrificing performance.",
        "choiceExplanations": [
          "Combining multiple review objectives in a single prompt creates context competition, where adding examples for one category can reduce performance in another. Separate, focused prompts allow each review type to have its own instructions and examples, improving recall across categories without sacrificing performance.",
          "A checklist may help business logic detection but still forces multiple concerns into one prompt and does not eliminate the trade-off.",
          "A stronger model may improve overall performance, but it does not guarantee removal of prompt interference between different review objectives."
        ],
        "difficulty": "medium"
      },
      {
        "id": "coding-142",
        "question": "Your codebase exploration tool stores session IDs to allow engineers to continue investigations across work sessions. An engineer spent an hour yesterday analyzing a legacy authentication module, building context about its architecture and dependencies. They want to continue today. The session ID is valid, but version control shows 3 of the 12 files the agent previously read were modified overnight by a teammate's merge. What approach best balances efficiency and accuracy?",
        "choices": [
          "Resume the session and immediately have the agent re-read all 12 previously analyzed files",
          "Resume the session without informing the agent about the changed files",
          "Resume the session and inform the agent which specific files changed for targeted re-analysis",
          "Start a fresh session to ensure the agent works with current codebase state without stale assumptions"
        ],
        "correctIndex": 2,
        "explanation": ". Why C is correct: This approach preserves the valuable context built during the previous session while ensuring accuracy by re-analyzing only the files that changed. It balances efficiency and correctness by avoiding unnecessary re-reading of unchanged files and preventing stale assumptions.",
        "choiceExplanations": [
          "Ensures freshness but is inefficient because nine files remain unchanged.",
          "Risks relying on outdated assumptions and missing the impact of recent changes.",
          ". Why C is correct: This approach preserves the valuable context built during the previous session while ensuring accuracy by re-analyzing only the files that changed. It balances efficiency and correctness by avoiding unnecessary re-reading of unchanged files and preventing stale assumptions.",
          "Guarantees fresh context but discards an hour of useful analysis and is unnecessarily inefficient."
        ],
        "difficulty": "hard"
      },
      {
        "id": "coding-143",
        "question": "An engineer sees an unfamiliar error message \"SYNC_CONFLICT: entity version mismatch detected\" in production logs but doesn't know which of the 12 services in the codebase generates it. They ask the agent to help locate the source code. What exploration approach will most efficiently find the responsible code?",
        "choices": [
          "Use Grep to search for distinctive text from the error message (like \"SYNC_CONFLICT\" or \"entity version mismatch\"), then Read the matching files to understand context.",
          "Use Glob to find files in directories commonly associated with error handling (such as errors/, exceptions/, or handlers/) across services, then Read each matching file.",
          "Use Grep to find all files that import the project's error handling module, then Read those files to locate custom error definitions.",
          "Read the project's README and service configuration files to understand the architecture, then systematically Read source files in service directory."
        ],
        "correctIndex": 0,
        "explanation": "Searching for unique strings in the error message is the fastest and most direct way to locate the source code that generates the error. Grep quickly identifies matching files, and Read provides the surrounding context to determine which service is responsible.",
        "choiceExplanations": [
          "Searching for unique strings in the error message is the fastest and most direct way to locate the source code that generates the error. Grep quickly identifies matching files, and Read provides the surrounding context to determine which service is responsible.",
          "Error messages may not be defined in dedicated error directories, making this approach inefficient and incomplete.",
          "Many files may import the error module, creating numerous irrelevant matches and increasing investigation time.",
          "Provides architectural context but is a slow, indirect approach for locating a specific error message."
        ],
        "difficulty": "easy"
      },
      {
        "id": "coding-144",
        "question": "You've configured your Claude agent with three MCP servers: one for git operations, one for Jira ticket management, and one for documentation search. When a user asks the agent to \"create a branch for JIRA-123 and add documentation links to the ticket,\" how does the agent access tools across these servers?",
        "choices": [
          "The agent queries each server sequentially to determine which handles each tool, routing calls based on tool name prefixes.",
          "Tools from all configured MCP servers are discovered at connection time and available simultaneously to the agent.",
          "You must specify which MCP server to use for each turn, and the agent can only access one server's tools at a time.",
          "The agent automatically selects the most relevant server based on the request and loads only that server's tools."
        ],
        "correctIndex": 1,
        "explanation": "When multiple MCP servers are configured, the agent discovers and loads tools from all connected servers during initialization. It can then use tools across servers in a single request—for example, using the Git server to create a branch, the Jira server to update the ticket, and the Documentation server to retrieve links.",
        "choiceExplanations": [
          "The agent does not probe servers one by one for every request or rely on tool name prefixes.",
          "When multiple MCP servers are configured, the agent discovers and loads tools from all connected servers during initialization. It can then use tools across servers in a single request—for example, using the Git server to create a branch, the Jira server to update the ticket, and the Documentation server to retrieve links.",
          "The agent can access tools from multiple servers simultaneously and does not require manual server selection per turn.",
          "Tools from all configured servers remain available; the agent is not limited to a single server per request."
        ],
        "difficulty": "easy"
      }
    ]
  }
];
