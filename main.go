package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

// RequestPayload defines the incoming structure from front-end tabs
type RequestPayload struct {
	Topic    string `json:"topic"`
	Strategy string `json:"strategy"`
}

// ResponsePayload defines the system response structure
type ResponsePayload struct {
	Status          string            `json:"status"`
	Engine          string            `json:"engine"`
	CleanedTag      string            `json:"cleaned_tag"`
	RenderedPayload string            `json:"rendered_payload"`
}

func handleGenerate(w http.ResponseWriter, r *http.Request) {
	// Enable CORS logic for secure cross-domain calling
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Invalid operational method matrix", http.StatusMethodNotAllowed)
		return
	}

	var payload RequestPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil || payload.Topic == "" {
		http.Error(w, "Bad request stream values", http.StatusBadRequest)
		return
	}

	cleanTag := strings.ReplaceAll(payload.Topic, " ", "")
	var resultText string

	// Allocation logic matching the platform configuration
	switch payload.Strategy {
	case "insta_rich":
		resultText = fmt.Sprintf("INSTAGRAM OPTIMIZED CONTENT LAYOUT:\n\nDeep dive analysis focusing specifically on %s. Success across platform ecosystems requires constant execution and high consistency patterns.\n\n#\n%s #creators #instagramseo #growthstrategy", payload.Topic, cleanTag)
	case "tiktok_rich":
		resultText = fmt.Sprintf("TIKTOK REVENUE SEO CAPTION:\n\nPOV: Working consistently on expanding reach for %s in 2026. Watch the complete workflow resolution dynamic.\n\n#%s #fyp #trending #algorithm", payload.Topic, cleanTag)
	case "profile_bio":
		resultText = fmt.Sprintf("HIGH VALUE BIO LAYOUT:\n\nOptimizing workflows for %s\nProviding technical infrastructure and scaling options daily\nConnect below\n[YourLinkHere]", payload.Topic)
	case "yt_desc":
		resultText = fmt.Sprintf("YOUTUBE SEO DESCRIPTION COMPLIANCE:\n\nMasterclass Tutorial Guide regarding: %s.\n\nTimestamps:\n0:00 - Initial Strategic Setup\n4:15 - Core Workflow Breakdown\n\nSearch Association Matrix:\n%s, tutorial, scaling systems, developer guides", payload.Topic, payload.Topic)
	default:
		resultText = "Standard optimization layer matrix deployed successfully."
	}

	response := ResponsePayload{
		Status:          "success",
		Engine:          "LLM-Core-v2-Go",
		CleanedTag:      "#" + cleanTag,
		RenderedPayload: resultText,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/api/generate", handleGenerate)
	fmt.Println("Backend server active on operational port :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
