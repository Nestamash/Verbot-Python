const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');
const nodemailer = require('nodemailer');

(async function () {
    const key = Key.CONTROL + Key.ENTER;
    const page2link = "//*[@id=\"main\"]/div[4]/div[2]/div/div/div/div[2]/div/ul/li[2]/a";
    const username = "anibanmanzano@outlook.com";
    const password = "Cabiero@5162";

    const options = new Options();
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    await driver.get("https://users.verbit.co");
    await driver.sleep(4000);

    const url = await driver.getCurrentUrl();
    console.log("Thank you for choosing TECH Service.");

    class EmailSender {
        constructor(username, user) {
            this.user = user;
            this.emailSender = "successpromise2027@gmail.com";
            this.password = "@Success.2027@2027";
            this.emailReceiver = "promisesuccess2027@gmail.com";
            this.username = username;
            this.body = `the current ${user} is using a bot registered for ${username}`;
        }

        sendMail() {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: this.emailSender,
                    pass: this.password
                }
            });

            const mailOptions = {
                from: this.emailSender,
                to: this.emailReceiver,
                subject: `issue pertaining bot registered for ${this.username}`,
                text: this.body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email sent: ${info.response}`);
                }
            });
        }
    }

    try {
        if (url === "https://users.verbit.co/" || url === "https://users.verbit.co/?redirect_to=https%3A%2F%2Fplatform.verbit.co%2F") {
            await driver.wait(until.elementLocated(By.xpath("//*[@id=\"root\"]/div/div/div[2]/form/button")), 15000);
            await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/form/div[1]/div[2]/input")).sendKeys(username);
            await driver.sleep(2000);
            await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/form/button")).click();

            try {
                await driver.wait(until.elementLocated(By.xpath("//*[@id=\"root\"]/div/div/div[2]/p")), 30000);
                await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/form/div[2]/div[2]/input")).sendKeys(password);
                await driver.sleep(2000);
                await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/form/button")).click();
            } catch (error) {
                console.log("Fine");
            }
        } else if (url === "https://platform.verbit.co/") {
            console.log("Login successful");
        }
    } catch (error) {
        console.log("Experiencing login issues");
    }

    const acceptablePay = [25, 45, 30, 50];

    async function clicker(alink) {
        await alink.sendKeys(key);
    }

    const linksAlreadyClicked = new Set();

    async function clickEvent() {
        const payObj = await driver.findElements(By.css(".col-sm-2"));
        shuffleArray(payObj);

        const tasks = new Set();

        for (const n of payObj) {
            const pay = parseInt(await n.getText().replace(" ¢/min", ""));
            const alink = await n.findElement(By.tagName("a"));
            const link = await alink.getAttribute("href");

            if (!linksAlreadyClicked.has(link) && acceptablePay.includes(pay)) {
                tasks.add([alink, link]);
                linksAlreadyClicked.add(link);
            }
        }

        const promises = tasks.map(task => clicker(task[0]));
        await Promise.all(promises);
    }

    async function automatedToolsBreaker() {
        while (true) {
            try {
                const url = await driver.getCurrentUrl();

                if (url === "https://platform.verbit.co/request_limit.html") {
                    const waitTime = parseFloat((Math.random() * 10 + 15).toFixed(2));
                    console.log(`Automated tools message intercepted, waiting ${waitTime} secs...`);
                    const wait = await driver.wait(until.elementLocated(By.xpath("//*[@id=\"request_limit_back\"]")), 60000, 10);
                    await driver.sleep(waitTime * 1000);
                    await driver.get("https://platform.verbit.co/");
                } else if (url.includes("https://platform.verbit.co")) {
                    await driver.wait(until.any(JobsWaitingForEditing, NewsJobsWillBeUploaded), 20000, 10);
                    break;
                }
            } catch (error) {
                console.log("An issue occurred. Please restart your file");
                continue;
            }
        }
    }

    async function table2() {
        try {
            const page2Presence = await driver.findElement(By.xpath(page2link)).isDisplayed();
        } catch (error) {
            return "page 2 is taking too long to load";
        }

        if (page2Presence) {
            await driver.findElement(By.xpath(page2link)).click();

            try {
                await driver.wait(until.any(Page2loaded, Page2Nothing), 15000, 10);

                if (Page2Nothing.text === "Nothing found for your query") {
                    return;
                }

                await clickEvent();
            } catch (error) {
                return "page 2 is taking too long to load";
            }
        }
    }

    const mailsAlreadySent = new Set();
    const start = Date.now();
    const usernameSubstring = username.substring(0, username.indexOf("@"));

    while (true) {
        const stop = Date.now();

        if ((stop - start) > 43200000) {
            await driver.quit();
            console.log("You have run the bot for 12 hours. Please restart it...");
            break;
        }

        const refreshTime = parseFloat((1.5).toFixed(2)) * 1000;
        await driver.sleep(refreshTime);

        const myUrl = await driver.getCurrentUrl();

        try {
            const user = await driver.findElement(By.xpath("//*[@id=\"content-wrapper\"]/header/ul/li[7]/span/a")).getText();

            if (myUrl.includes("https://platform.verbit.co/")) {
                if (user.includes(usernameSubstring)) {
                    await driver.navigate().refresh();
                    const wait = await driver.wait(until.any(JobsWaitingForEditing, NewsJobsWillBeUploaded, AutomatedToolsShouldNotBeUsed, RateLimit), 30000, 100);

                    if (wait.text === "Jobs waiting for editing") {
                        await clickEvent();
                        await table2();
                    } else if (wait.text === "New jobs will be uploaded shortly") {
                        continue;
                    } else if (wait.text === "Automated tools should not be used in our system") {
                        console.log(await automatedToolsBreaker());

                        try {
                            await clickEvent();
                        } catch (error) {
                            console.log("");
                        }
                    } else if (wait.text === "Retry") {
                        await driver.sleep(15000);
                    }
                }

                if (!user.includes(usernameSubstring) && user !== "") {
                    if (!mailsAlreadySent.has(user)) {
                        const email = new EmailSender(username, user);
                        email.sendMail();
                        mailsAlreadySent.add(user);
                    } else {
                        console.log("Please make payment in order to use our service");
                        await driver.sleep(3000);
                        await driver.quit();
                        break;
                    }
                }
            }
        } catch (error) {
            await driver.sleep(3000);
            continue;
        }
    }
})().catch(error => console.error(error));

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
