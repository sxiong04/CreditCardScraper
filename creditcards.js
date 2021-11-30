const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://creditcards.usnews.com/cards";

async function scrapeData (url) {
    axios.get(url)
        .then((response) => {
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                const cards = $(".List__ListItem-rhf5no-1 a");
                const credit_cards = [];
                cards.each(function (idx, el) {
                    const title = $(el).text()
                    const link = $(el).attr("href");
                    credit_cards.push({title: title, url: link})
                });
                fs.writeFile("credit_cards.json", JSON.stringify(credit_cards, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log("Successfully written data to file");
                });
            }
        }, (error) => console.log(err));
}

scrapeData(url);