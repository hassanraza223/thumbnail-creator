document.getElementById('generateBtn').addEventListener('click', function() {
    const topic = document.getElementById('topicInput').value.trim();
    const platform = document.getElementById('platformSelect').value;
    const outputBox = document.getElementById('outputBox');
    const captionResult = document.getElementById('captionResult');

    if (topic === "") {
        alert("Please enter a topic first! 😉");
        return;
    }

    let generatedCaption = "";

    if (platform === "youtube") {
        generatedCaption = `🎥 Video Title Idea: ${topic}! 🚀\n\nHey guys! In this video, we are diving deep into "${topic}". Make sure to watch till the end for some amazing tips!\n\n📌 Don't forget to LIKE, SHARE, and SUBSCRIBE for more content!\n\n#youtube #${topic.replace(/\s+/g, '')} #trending #viral #creators`;
    } 
    else if (platform === "tiktok") {
        generatedCaption = `🔥 POV: You are watching the best video on ${topic} 😎 \n\nWait for the end! 👁️👄👁️ \n\n#${topic.replace(/\s+/g, '')} #fyp #foryou #trending #viral #xyzbca #tiktok`;
    } 
    else if (platform === "facebook") {
        generatedCaption = `✨ Amazing Update! ✨\n\nToday I wanted to share something special about "${topic}" with all of you. Let me know your thoughts in the comments below! 👇💬\n\n#${topic.replace(/\s+/g, '')} #facebook #community #viralpost #share`;
    }

    captionResult.innerText = generatedCaption;
    outputBox.style.display = "block";
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const textToCopy = document.getElementById('captionResult').innerText;
    navigator.clipboard.writeText(textToCopy);
    alert("Caption copied to clipboard! 🔥");
});