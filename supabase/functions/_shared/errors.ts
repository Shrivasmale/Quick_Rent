// supabase/functions/_shared/errors.ts

export interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail: string;
  correlationId?: string;
}

export function createErrorResponse(
  status: number,
  title: string,
  detail: string,
  correlationId: string,
  extraHeaders: HeadersInit = {}
): Response {
  const body: ProblemDetails = {
    type: `https://quickrent.com/errors/${status}`,
    title,
    status,
    detail,
    correlationId,
  };

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/problem+json",
      ...extraHeaders,
    },
  });
}
