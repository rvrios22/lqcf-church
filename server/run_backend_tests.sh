#!/bin/bash

# --- Configuration ---
# Default URL if not provided
DEFAULT_URL="http://localhost:3001"

# wrk test parameters
WRK_THREADS=2
WRK_CONNECTIONS=50
WRK_DURATION="10s"

# Error rate test parameters
ERROR_RATE_NUM_REQUESTS=100

# --- Functions ---

# Function to test single request response time
test_single_response_time() {
  echo "--- Testing Single Request Response Time ---"
  echo "URL: $1"
  time curl -s -o /dev/null -w "Total Time: %{time_total}s\nHTTP Code: %{http_code}\n\n" "$1"
}

# Function to test throughput and concurrent response time using wrk
test_throughput_and_latency() {
  echo "--- Testing Throughput and Concurrent Latency (with wrk) ---"
  echo "URL: $1"
  echo "Running for $WRK_DURATION with $WRK_THREADS threads and $WRK_CONNECTIONS connections..."
  # Check if wrk is installed
  if ! command -v wrk &> /dev/null
  then
      echo "Error: 'wrk' command not found. Please install wrk to run this test."
      echo "  (e.g., sudo apt-get install wrk or brew install wrk)"
      echo "Skipping throughput test."
      return 1 # Indicate failure
  fi
  wrk -t"$WRK_THREADS" -c"$WRK_CONNECTIONS" -d"$WRK_DURATION" "$1"
  echo "" # Newline for readability
}

# Function to test error rate by looping curl requests
test_error_rate() {
  echo "--- Testing Error Rate ---"
  echo "URL: $1"
  echo "Sending $ERROR_RATE_NUM_REQUESTS requests..."
  
  ERROR_COUNT=0
  for i in $(seq 1 $ERROR_RATE_NUM_REQUESTS); do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$1")
    if [[ "$HTTP_CODE" -ge 400 ]]; then
      # Uncomment the next line to see individual errors:
      # echo "  Request $i: ERROR! HTTP Code: $HTTP_CODE"
      ((ERROR_COUNT++))
    fi
  done

  # Using 'bc' for floating-point arithmetic
  if (( $NUM_REQUESTS == 0 )); then
    ERROR_PERCENT="0.00"
  else
    ERROR_PERCENT=$(echo "scale=2; ($ERROR_COUNT / $ERROR_RATE_NUM_REQUESTS) * 100" | bc)
  fi

  echo "Total Requests: $ERROR_RATE_NUM_REQUESTS"
  echo "Errors (HTTP 4xx/5xx): $ERROR_COUNT"
  echo "Error Rate: ${ERROR_PERCENT}%"
  echo "" # Newline
}

# Function to provide guidance on database query performance
# Note: This cannot be run directly from bash as it requires app internal metrics
guidance_db_query_performance() {
  echo "--- Database Query Performance (Guidance) ---"
  echo "Database query performance needs to be measured *within your application*."
  echo "1. Implement timing around critical database calls in your backend code."
  echo "   (e.g., using 'process.hrtime.bigint()' in Node.js)."
  echo "2. You can expose a dedicated API endpoint (e.g., /test-db-query) that triggers a common query"
  echo "   and returns its execution time. Then you can hit this endpoint with 'wrk' or 'curl'."
  echo "3. Collect multiple timings and calculate average/percentiles."
  echo "   Example: If you have a /test-db-query endpoint that returns JSON: {\"queryTimeMs\": 12.34}"
  echo "   You can use 'curl' in a loop or 'wrk' and parse the JSON response for the 'queryTimeMs' value."
  echo ""
}

# --- Main Script Logic ---

# Check if a URL argument was provided
if [ -z "$1" ]; then
  URL=$DEFAULT_URL
  echo "No URL provided. Using default: $URL"
else
  URL="$1"
  echo "Using URL from argument: $URL"
fi

# Run all tests
test_single_response_time "$URL"
test_throughput_and_latency "$URL"
test_error_rate "$URL"
guidance_db_query_performance # This function doesn't take an argument as it's explanatory