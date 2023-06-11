const quoteContainer=document.getElementById("quote-generator");
const quoteText=document.getElementById("quote");
const quoteAuthorText=document.getElementById("author");
const quoteTwitterBtn=document.getElementById("twitter");
const quoteNewQuoteBtn=document.getElementById("new-quote");
const getLoader=document.getElementById("loader");

let apiQuote=[];


// show loading
function loading()
{
    getLoader.hidden=false;
    quoteContainer.hidden=true;
}
// hide loading

function complete()
{
    quoteContainer.hidden=false;
    getLoader.hidden=true;
}

// select random quote from array
function newQuote()
{
    loading();
    const quote=apiQuote[Math.floor(Math.random() * apiQuote.length)]
   // console.log(quote);
//    if author is blank place unkonwn
   if(!quote.author)
   {
    quoteAuthorText="unknown";
   }
   else{
   quoteAuthorText.textContent=quote.author;
   }
   if(quote.text.length>150)
   {
        quoteText.classList.add('long-quote');
   }
   else{
    quoteText.classList.remove('long-quote');
   }
   quoteText.textContent=quote.text;
   complete();

}
// get quotes from api
async function getQuote()
{
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response=await fetch(apiUrl);
        apiQuote= await response.json();
        //console.log(apiQuote);
        newQuote();
    }
    catch(error)
    {

    }
}

function tweeterButton()
{
    const tweetUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthorText.textContent}`;
    window.open(tweetUrl,'_blank');
}

// Even listners
quoteNewQuoteBtn.addEventListener('click',newQuote);
quoteTwitterBtn.addEventListener('click',tweeterButton);


getQuote();
//loading();