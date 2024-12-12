const {Builder, By, Key, until,Select} = require('selenium-webdriver');
const rp = require('request-promise');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://dev.bajajcapital.com/nps/');
        
        // Fill in the PRAN Number
        // await driver.findElement(By.id('pran')).sendKeys('your_PRAN_number_here');
        
        // Fill in the PAN Number
        await driver.findElement(By.id('pan')).sendKeys('DANPB8378A');
        
        // Fill in the Date of Birth
        await driver.findElement(By.css('.calendar')).click();
        await driver.findElement(By.css('.custom-select:nth-child(2)')).click();
        await driver.findElement(By.xpath("//option[@value='1998']")).click();

        await driver.findElement(By.css('.custom-select:nth-child(1)')).click();
        await driver.findElement(By.xpath("//option[contains(.,'Mar')]")).click();

        await driver.findElement(By.xpath("//div[4]/div[3]/div")).click();

        // Select Central Record Agency--------> need to do code for selection
        // await driver.findElement(By.xpath("//div[4]/div/div")).click(); // Choose NSDL or KFintech
        
        // Click on the submit button
        await driver.findElement(By.id('btnsubmit')).click();
        // await new Promise(resolve => setTimeout(resolve, 10000));
        let requestBody = {mobile: "+918800868048"}
        // const requestOptions = {
        //     method: 'POST',
        //     uri: "http://localhost:8005/nps/api/v1/getOTP",
        //     body: requestBody,
        //     json: true
        // };
        // const otpResponse = await rp(requestOptions)
        // console.log("SurveyResponse",otpResponse)
        // const OTP = otpResponse.data[0].OTP
        // console.log("OTP...",OTP)
        // await driver.wait(until.elementLocated(By.xpath("//input[@name='otp']")), 10000).sendKeys(OTP);
        await driver.wait(until.elementLocated(By.xpath("//input[@name='otp']")), 50000).sendKeys(850119);

        await driver.findElement(By.id('btnsubmit')).click();
        // const errorMessageElement = await driver.wait(until.elementLocated(By.id('otpInvalidmsg')),5000);
        // if (await errorMessageElement.isDisplayed()) {
        //     // If error message is displayed, get the text and print it
        //     const errorMessage = await errorMessageElement.getText();
        //     console.log('Error message:', errorMessage);
        //     // sendSlackNotification({
        //     //     auther: "NPS NAV Automation",
        //     //     title: "NPS NAV Automation SUCCESS!",
        //     //     text: "NAV updation success for "+navDate,
        //     //   });

        // } else {
        //     console.log('OTP submitted successfully.');
        // }

        await driver.wait(until.elementLocated(By.id('CountryCode')),1000).click();

        await driver.findElement(By.id('CountryCode')).sendKeys('India')

        // Scroll the element into view
        // await driver.executeScript("arguments[0].scrollIntoView()", await driver.findElement(By.id('btnnext')));
        await driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", await driver.findElement(By.id('btnnext')));

        await driver.sleep(2000);
        // Click the button
        await driver.findElement(By.id('btnnext')).click();
      
          // Wait for WebEngage iframe to load and switch to iframe
        await driver.wait(until.elementLocated(By.id('webpush-onsite')), 10000); 
        let iframe = await driver.findElement(By.id('webpush-onsite')); 
        await driver.switchTo().frame(iframe); 

        // Now interact with the elements inside the iframe
        await driver.wait(until.elementLocated(By.id('deny')), 10000); 
        await driver.findElement(By.id('deny')).click();
        // Switches back to the main content of the page
        await driver.switchTo().defaultContent();
        await driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", await driver.findElement(By.id('btnnext')));

        await driver.findElement(By.xpath("//button[contains(.,'OK')]")).click();

        //button[contains(.,'OK')]

        // Wait for some time to see the result
        // await driver.sleep(5000); // Adjust the time as needed
        
    } 
    finally {
        // await driver.quit();
    }
})();


let sendSlackNotification = async (msg) => {
    if (process.env['ENVIRONMENT'] != 'PROD') return false;
    rp({
      method: "POST",
      uri: "https://hooks.slack.com/services/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",
      body: {
        "attachments": [
          {
            "fallback": "FALLBACK ||  Automated job executed.",
            "color": "#228B22",
            "pretext": "ALERT!!! OTP Verification Fail Notification",
            "author_name": msg.auther,
            "author_link": "https://titans.onebajaj.capital/",
            "author_icon": "https://media.licdn.com/dms/image/C510BAQHr_cKcehuHYQ/company-logo_200_200/0?e=2159024400&v=beta&t=3O0EGkQ1KE7Tpg1CxKRpF2apRuKNRp--vKjQvhj-DOQ",
            "title": msg.title,
            "title_link": "https://titans.onebajaj.capital/",
            "text": msg.text,
            "fields": "Web",
            "image_url": "",
            "thumb_url": "",
            "footer": "Team Bajaj Capital",
            "footer_icon": "https://media.licdn.com/dms/image/C510BAQHr_cKcehuHYQ/company-logo_200_200/0?e=2159024400&v=beta&t=3O0EGkQ1KE7Tpg1CxKRpF2apRuKNRp--vKjQvhj-DOQ",
            "ts": new Date().getTime() / 1000
          }
        ]
      },
      json: true
    }).then(succ => {
      // console.log(succ);
    }, error => {
      console.log("Failed to send slack notification:\n", error)
    });
  }





// ----YATIN Credential
  // Fill in the PAN Number
//   await driver.findElement(By.id('pan')).sendKeys('BRFPN1189L');
        
//   // Fill in the Date of Birth
//   await driver.findElement(By.css('.calendar')).click();
//   await driver.findElement(By.css('.custom-select:nth-child(2)')).click();
//   await driver.findElement(By.xpath("//option[@value='2000']")).click();

//   await driver.findElement(By.css('.custom-select:nth-child(1)')).click();
//   await driver.findElement(By.xpath("//option[contains(.,'May')]")).click();

//   await driver.findElement(By.xpath("//div[4]/div[7]/div")).click();