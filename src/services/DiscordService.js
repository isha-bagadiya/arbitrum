import axios from "axios";

function DiscordService() {
  const Send = async (data) => {
    const body = {
      content: "",
      tts: false,
      color: "#dffe00",
      embeds: [
        {
          title: "Faucet Claimed 🚰",
          description: data,
        },
      ],
    };

    try {
      const data = await axios.post(
        process.env.REACT_APP_DISCORD_WEBHOOK_URL,
        body
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    Send,
  };
}

export default DiscordService;
