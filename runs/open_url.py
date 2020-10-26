from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
# instantiate a chrome options object so you can set the size and headless preference
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1920x1080")

# current directory
chrome_driver = os.getcwd() +"\\driver\\chromedriver.exe"

# go to Google and click the I'm Feeling Lucky button
driver = webdriver.Chrome(chrome_options=chrome_options, executable_path=chrome_driver)
driver.get("https://www.google.com")

driver.close()