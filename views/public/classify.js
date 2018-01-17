
function Classify(){
            var role = document.getElementsByName('accountRole');
            for(var i = 0; i < role.length ; i++){
                if(role[i].checked){
                if(role[i].value == "Learner"){
                document.getElementById('option1').value = "Individual";
                document.getElementById('option2').value = "Corporate";
                document.getElementById('option1').innerHTML = "Individual";
                document.getElementById('option2').innerHTML = "Corporate";
                break;
            }else if(role[i].value == "Educator"){
                document.getElementById('option1').value = "Self Employed";
                document.getElementById('option2').value = "Learning Partner";
                document.getElementById('option1').innerHTML = "Self Employed";
                document.getElementById('option2').innerHTML = "Learning Partner";
                break;
            }else{
                document.getElementById('option1').value ="";
                document.getElementById('option2').value = "";
                document.getElementById('option1').innerHTML = "";
                document.getElementById('option2').innerHTML = "";
                break;
            }
            
            }
            
            }
            }
function submitIndiForm(){
   document.forms['outForms'].submit();
   document.forms['indiForm'].submit();
    return true;
}
function submitCorpForm(){
   document.forms['outForms'].submit();
   document.forms['corpForm'].submit();
    return true;
}
function submitSelfForm(){
   document.forms['outForms'].submit();
   document.forms['selfForm'].submit();
    return true;
}
function submitLearnPartForm(){
   document.forms['outForms'].submit();
   document.forms['learnpartForm'].submit();
    return true;
}
function Type(){
            var individualAccountForm = document.getElementById('individual-account-form');
            var corporateAccountForm = document.getElementById('corporate-account-form');
            var selfEmployedAccountForm = document.getElementById('selfemployed-account-form');
            var learningPartnerAccountForm = document.getElementById('learningpartner-account-form');
            var formIndi = document.getElementById('indiForm');
            var formCorp = document.getElementById('corpForm');
            var formSelf = document.getElementById('selfForm');
            var formLearnPart = document.getElementById('learnpartForm');
            var smallForm = document.getElementById('inputUname');
            var type = document.getElementById('account-type');
            var choice = type.options[type.selectedIndex].text;
            
            if(choice === "Self Employed"){
                individualAccountForm.style.display = "none";
                corporateAccountForm.style.display = "none";
                learningPartnerAccountForm.style.display = "none";
                selfEmployedAccountForm.style.display = "block";
                smallForm.style.display = "block";
                
                
            }else if(choice === "Learning Partner"){
                individualAccountForm.style.display = "none";
                corporateAccountForm.style.display = "none";
                learningPartnerAccountForm.style.display = "block";
                selfEmployedAccountForm.style.display = "none";
                smallForm.style.display = "block"; 
                
            }else if(choice === "Individual"){
                 individualAccountForm.style.display = "block";
                corporateAccountForm.style.display = "none";
                learningPartnerAccountForm.style.display = "none";
                selfEmployedAccountForm.style.display = "none";
                smallForm.style.display = "block"; 
                
            }else if(choice === "Corporate"){
                 individualAccountForm.style.display = "none";
                corporateAccountForm.style.display = "block";
                learningPartnerAccountForm.style.display = "none";
                selfEmployedAccountForm.style.display = "none"; 
                smallForm.style.display = "block"; 
                
            }else{
                individualAccountForm.style.display = "none";
                corporateAccountForm.style.display = "none";
                learningPartnerAccountForm.style.display = "none";
                selfEmployedAccountForm.style.display = "none";
                smallForm.style.display = "none"; 
            }
}

 function windowLoad(){
        Classify(); 
        Type();
    }
    window.onload = windowLoad();
            