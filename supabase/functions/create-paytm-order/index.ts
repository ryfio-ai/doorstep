import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

console.log("Create Paytm Order Function running!")

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, studentId, courseId } = await req.json()

    // Mock response for now, this would normally generate the Paytm Checksum
    const orderId = `ORDER_${Date.now()}`
    const txnToken = `MOCK_TXN_TOKEN_${Math.random()}`

    return new Response(
      JSON.stringify({ orderId, txnToken, amount }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
