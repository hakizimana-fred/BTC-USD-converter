const currencyField = document.querySelectorAll('.currencyField')

let convFrom

currencyField.forEach(field => {
   field.addEventListener('keyup', function(){
       if (this.getAttribute('name') === 'btc') {
           convFrom = "btc"
           convTo = "usd"
       }else{
           convFrom = "usd"
           convTo = "btc"
       }

       fetch('https://api.coindesk.com/v1/bpi/currentprice/usd.json')
            .then(res => res.json())
            .then(data => {
                const origAmount = parseFloat(document.querySelector("input[name='" + convFrom + "']").value);     
                const exchangeRate = parseInt(data.bpi.USD.rate_float);

                let amount
                if (convFrom == "btc") 
                    amount = parseFloat(origAmount * exchangeRate);
                else
                    amount = parseFloat(origAmount/ exchangeRate);
                document.querySelector("input[name='" + convTo + "']").value = amount
            })            
   }) 
})