#!/bin/bash

# --- Configuration ---
# Base URL for your API - MODIFY THIS TO YOUR SERVER'S BASE URL
BASE_URL="https://lqcfchurch.org/api"


# wrk test parameters
WRK_THREADS=2
WRK_CONNECTIONS=50
WRK_DURATION="10s"

# Error rate test parameters
ERROR_RATE_NUM_REQUESTS=100

# --- Functions ---

# Function to test single request response time
test_single_response_time() {
  local FULL_URL="$1" # Capture the full URL passed to the function
  echo "--- Testing Single Request Response Time ---"
  echo "URL: $FULL_URL"
  time curl -s -o /dev/null -w "Total Time: %{time_total}s\nHTTP Code: %{http_code}\n\n" "$FULL_URL"
}

# Function to test throughput and concurrent response time using wrk
test_throughput_and_latency() {
  local FULL_URL="$1" # Capture the full URL passed to the function
  echo "--- Testing Throughput and Concurrent Latency (with wrk) ---"
  echo "URL: $FULL_URL"
  echo "Running for $WRK_DURATION with $WRK_THREADS threads and $WRK_CONNECTIONS connections..."
  
  if ! command -v wrk &> /dev/null
  then
      echo "Error: 'wrk' command not found. Please install wrk to run this test."
      echo "  (e.g., sudo apt-get install wrk or brew install wrk)"
      echo "Skipping throughput test."
      return 1 # Indicate failure
  fi
  wrk -t"$WRK_THREADS" -c"$WRK_CONNECTIONS" -d"$WRK_DURATION" "$FULL_URL"
  echo "" # Newline for readability
}

# Function to test error rate by looping curl requests
test_error_rate() {
  local FULL_URL="$1" # Capture the full URL passed to the function
  echo "--- Testing Error Rate ---"
  echo "URL: $FULL_URL"
  echo "Sending $ERROR_RATE_NUM_REQUESTS requests..."
  
  ERROR_COUNT=0
  for i in $(seq 1 $ERROR_RATE_NUM_REQUESTS); do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$FULL_URL")
    if [[ "$HTTP_CODE" -ge 400 ]]; then
      # Uncomment the next line to see individual errors:
      # echo "  Request $i: ERROR! HTTP Code: $HTTP_CODE"
      ((ERROR_COUNT++))
    fi
  done

  # Using 'bc' for floating-point arithmetic
  if (( ERROR_RATE_NUM_REQUESTS == 0 )); then # Handle division by zero
    ERROR_PERCENT="0.00"
  else
    ERROR_PERCENT=$(echo "scale=2; ($ERROR_COUNT / $ERROR_RATE_NUM_REQUESTS) * 100" | bc)
  fi

  echo "Total Requests: $ERROR_RATE_NUM_REQUESTS"
  echo "Errors (HTTP 4xx/5xx): $ERROR_COUNT"
  echo "Error Rate: ${ERROR_PERCENT}%"
  echo "" # Newline
}

test_db_query_performance() {
  echo "--- Testing Database Query Performance ---"
  echo "This test hits a special endpoint that executes a database query and returns its time."
  echo "To customize, modify the '/api/test-db-query' call in this script."

  # Example queries you can run against your custom endpoint:
  # Replace 'User' with your actual model name, adjust method and parameters as needed.

  # Test Event.findAll()
  local MODEL="Event"
  local METHOD="findAll"
  local QUERY_URL="${BASE_URL}/test-db-query?model=${MODEL}&method=${METHOD}&limit=10"
  echo "Testing ${MODEL}.${METHOD}(limit=10)..."
  curl -s "$QUERY_URL" | jq '.queryTimeMs' # Uses jq to parse JSON and get the time

  # Test PDF.findByPk(1)
  MODEL="PDF"
  METHOD="findByPk"
  local ID=1
  QUERY_URL="${BASE_URL}/test-db-query?model=${MODEL}&method=${METHOD}&id=${ID}"
  echo "Testing ${MODEL}.${METHOD}(${ID})..."
  curl -s "$QUERY_URL" | jq '.queryTimeMs'

  # Test Study.findAll()
  local MODEL="Study"
  local METHOD="findAll"
  local QUERY_URL="${BASE_URL}/test-db-query?model=${MODEL}&method=${METHOD}&limit=10"
  echo "Testing ${MODEL}.${METHOD}(limit=10)..."
  curl -s "$QUERY_URL" | jq '.queryTimeMs'
}

# --- Main Script Logic ---

TARGET_ROUTE=""

# Check if a route argument was provided
if [ -z "$1" ]; then
  TARGET_ROUTE=$DEFAULT_ROUTE
  echo "No route provided. Using default route: $TARGET_ROUTE"
else
  # Ensure the route starts with a '/' if it doesn't already, for proper URL construction
  if [[ "$1" == /* ]]; then
    TARGET_ROUTE="$1"
  else
    TARGET_ROUTE="/$1"
  fi
  echo "Using route from argument: $TARGET_ROUTE"
fi

# Construct the full URL
FULL_TARGET_URL="${BASE_URL}${TARGET_ROUTE}"
echo "Full URL to be tested: $FULL_TARGET_URL"
echo "" # Newline

# Run all tests
test_single_response_time "$FULL_TARGET_URL"
test_throughput_and_latency "$FULL_TARGET_URL"
test_error_rate "$FULL_TARGET_URL"
test_db_query_performance