import requests
import demjson
from bs4 import BeautifulSoup
import json
def getHTMLText(url):
    try:
        r = requests.get(url, timeout = 30)
        r.raise_for_status()
        #r.encoding = 'utf-8'
        return r.text
    except:
        return ""

# for links like https://news.qq.com/a/time/newsID.htm
def getContentwithA(url):
    html = getHTMLText(url)
    soup = BeautifulSoup(html, "html.parser")
    title = soup.select("div.hd > h1")
    time = soup.select("div.a_Info > span.a_time")
    paras = soup.select("div.Cnt-Main-Article-QQ > p.text")
    textcontent=""
    for para in paras:
        if len(para) > 0:
            textcontent+=para.get_text()
    temp = soup.find('script', {'type': 'text/javascript'}).contents[0].replace("\n", "").split("||")[-1]
    keywords=demjson.decode(temp.replace("\'", "\""))["tags"]
    #将爬取到的文章用字典格式来存
    article = {
        'Title' : title[0].get_text(),
        'Time' : time[0].get_text(),
        'Paragraph' : textcontent,
        'keywords':keywords,
        'catalog1':"unknown",
        'catalog2':"unknown"
    }
    print(article)

#for links like http://new.qq.com/omn/time/newsID.html
def getContentWithTime(url):
    html = getHTMLText(url)
    soup = BeautifulSoup(html, "html.parser")
    title = soup.select("div.LEFT > h1")
    paras = soup.select("div.content-article > p.one-p")
    textcontent = ""
    for para in paras:
        if len(para) > 0:
            textcontent += para.get_text().replace('\n',"")
    # 将爬取到的文章用字典格式来存
    temp = json.loads((soup.findAll('script')[5]).contents[0].split("=")[-1])
    keywords = temp["tags"].split(",")
    time=temp["pubtime"]
    catalog1=temp["catalog1"]
    catalog2=temp["catalog2"]
    article = {
        'Title': title[0].get_text(),
        'Time': time,
        'Paragraph': textcontent,
        'keywords':keywords,
        'catalog1': catalog1,
        'catalog2': catalog2
    }
    print(article)


def main():
    getContentwithA("https://news.qq.com/a/20170504/012032.htm")
    getContentWithTime("https://new.qq.com/omn/20201005/20201005A0CR2P00.html")

main()