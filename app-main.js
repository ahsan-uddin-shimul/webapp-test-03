var enterInput = document.getElementById('rate-vat');

enterInput.addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        event.preventDefault();
        document.getElementById('button').click();
    }
})

function myFunction(){
    location.reload();
}





const btnSubmit = document.querySelector('#form-submit #button');


btnSubmit.addEventListener('click', function(e){

    // prevent default refresh
    e.preventDefault();

    // capture - invoice value, vat rate & tax rate
    const invValue = document.getElementById('inv-amount').value;
    console.log(invValue);
    const rateTax = document.getElementById('rate-tax').value;
    console.log(rateTax);
    const rateVat = document.getElementById('rate-vat').value;
    console.log(rateVat);
    
    // capture - check-box of vat & tax
    const chkTax = document.querySelector('#chk-tax');
    const chkVat = document.querySelector('#chk-vat');

    // --------------------------------------------------------------------------
    // condition-1: no vat & tax added
    if(!chkTax.checked && !chkVat.checked){
        
        const amntTax = ( invValue * (100 / (100 - rateTax))) - invValue;
        document.getElementById('amnt-tax').value = amntTax.toFixed(2);

        const amntTaxTot = parseFloat(invValue) + parseFloat(amntTax);
        document.getElementById('amnt-tax-one').value = amntTaxTot.toFixed(2);


        const baseValue = (parseFloat(invValue) + parseFloat(amntTax)).toFixed(2);
        console.log(baseValue);
        const amntVat = parseFloat((baseValue * (rateVat / 100)).toFixed(2));
        console.log(typeof amntVat);
        document.getElementById('amnt-vat').value = amntVat.toFixed(2);

        // final amount
        const amntFinal = parseFloat(invValue) + parseFloat(amntTax) + parseFloat(amntVat);
        console.log(typeof amntFinal);
        document.getElementById('amnt-final').value = amntFinal.toFixed(2);

        document.getElementById('text_final').innerText = '(VAT & TAX Included Amount)';
    
    } 

    // --------------------------------------------------------------------------
    // condition-2: both vat & tax added
    else if(chkTax.checked && chkVat.checked){

        const amntVat = (invValue * rateVat) / (100 + parseFloat(rateVat));
        console.log(amntVat);
        document.getElementById('amnt-vat').value = amntVat.toFixed(2);

        const amntTax = (invValue - amntVat) * (parseFloat(rateTax) / 100);
        console.log(amntTax);
        document.getElementById('amnt-tax').value = amntTax.toFixed(2);

        const amntTaxTot = parseFloat(invValue) - ((invValue * rateVat) / (100 + parseFloat(rateVat)));
        document.getElementById('amnt-tax-one').value = amntTaxTot.toFixed(2);


        // final amount
        const amntFinal = parseFloat(invValue) - parseFloat(amntTax) - parseFloat(amntVat);
        console.log(typeof amntFinal);
        document.getElementById('amnt-final').value = amntFinal.toFixed(2);

        document.getElementById('text_final').innerText = '(Supplier Take-Home Amount)';
    
    }

        // --------------------------------------------------------------------------
    // condition-3: tax added, vat not added
    else if(chkTax.checked && !chkVat.checked){

        const amntTax = invValue * (rateTax / 100);
        console.log(amntTax);
        document.getElementById('amnt-tax').value = amntTax.toFixed(2);

        const amntTaxTot = parseFloat(invValue);
        document.getElementById('amnt-tax-one').value = amntTaxTot.toFixed(2);

        const amntVat = invValue * (rateVat / 100);
        console.log(amntVat);
        document.getElementById('amnt-vat').value = amntVat.toFixed(2);

        // // final amount
        const amntFinal = parseFloat(invValue) + parseFloat(amntVat);
        console.log(typeof amntFinal);
        document.getElementById('amnt-final').value = amntFinal.toFixed(2);

        document.getElementById('text_final').innerText = '(VAT & TAX Included Amount)';
    
    } 

    else if(!chkTax.checked && chkVat.checked){

        window.alert('Error! VAT accept TAX is not acceptable.')

    
    }


})
