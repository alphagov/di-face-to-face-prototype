//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)


var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY);


//Individuals :
//AUTH PHONE NUMBER - WORKING
//SMS1
/*
router.post('/v14/offline-po-process', async function(request, response) {

  var authphone = request.session.data['auth-create-mobile-test']

  if (authphone !=='') {
   
  
    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumberauth']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    

  } else {
    response.send("No phone number provided")

  } 
})

// SMS2 - sent after PO
router.post('/v14/offline-successful-email', async function(request, response) {

  var authphone = request.session.data['auth-create-mobile-test']

  if (authphone !=='') {
   
  
    await notify.sendSms(
      '7eb456b7-a03c-4930-a235-0f857f4e7f13',
      request.session.data['mobileNumberauth']
    ).then(function() { 
      response.redirect('/v14/offline-successful-email')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    
  } else {
    response.send("No phone number provided")
  } 
   
})
*/

//F2F PHONE NUMBER
//BOTH WORKING

router.post('/v14/offline-po-process', async function(request, response) {

  var whichphone = request.session.data['offline-enter-mobile']

  if (whichphone !=='') {
   
  
    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumber']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    

  } else {
    response.send("No phone number provided")

  } 
})

// SMS2 - sent after PO
router.post('/v14/offline-successful-email', async function(request, response) {

  var whichphone = request.session.data['offline-enter-mobile']

  if (whichphone !=='') {
   
  
    await notify.sendSms(
      '7eb456b7-a03c-4930-a235-0f857f4e7f13',
      request.session.data['mobileNumber']
    ).then(function() { 
      response.redirect('/v14/offline-successful-email')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    
  } else {

    response.send("No phone number provided")
  } 
   
})



/*
// notify email sending test 
router.post('/email-address-page', function (req, res) {

  var personalisation = {
    'first_name': 'Amala',
    'reference_number': '300241'
  }

  notify.sendEmail(
    // this long string is the template ID, copy it from the template
    // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
    // in your code.
    '1e29bf2c-a39a-4fb0-ae05-3832fed5392f',
    // `emailAddress` here needs to match the name of the form field in
    // your HTML page
    req.body.emailAddress, {
      personalisation: personalisation,
      reference: ""
    }
  )

  // This is the URL the users will be redirected to once the email
  // has been sent
  res.redirect('/offline-email-confirmation');

});
*/

/*
router.post('app/views/v14/offline-enter-mobile.html', function (req, res) {
  if (req.body.mobileNumber !== '') {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2
    }
    notify.sendSms(
      '5f76fecc-44b0-4950-bb5e-0d8e52e51cc9',
      req.body.mobileNumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('offline-checkphone')
})
*/


/*
router.post(‘/v14/offline-enter-mobile', function(req, res) {
  if (req.body.mobileNumber !== '') {

    NotifyClient
  .sendSms('5f76fecc-44b0-4950-bb5e-0d8e52e51cc9', '+447717643215', {
    personalisation: null,
    reference: null,
    })
  .then(res => console.log(res))
  .catch(err => console.error(err)) }
  res.redirect(‘offline-checkphone') })

*/
// V2 routing
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

/*
// choose wether to continue or go back to RP
router.post('/v2/preauth-route', function (req, res) {
  const usegovuk = req.session.data['use-govuk-account']
  // chooses to continue
  if (usegovuk === 'yes') {
    res.redirect('preauth-checks')
  } else {
    // return to service
    req.session.data['reason'] = 'abandon'
    res.redirect('preauth-create-spinner')
  }
})




// check document
router.post('/app-photoid', function (req, res) {
  // pick up the selected docs
  const photoIds = req.session.data['id-documents']
  // work out the logic for which options to show on the next page
  let passport = ["UK passport"],
    dl = ["UK driving licence"],
    m2b = ["UK passport","UK driving licence"]

  let checker = (arr, target) => target.every(v => arr.includes(v))

  req.session.data['useiProovPP'] = checker(photoIds, passport)
  req.session.data['useiProovDL'] = checker(photoIds, dl)
  req.session.data['useM2b'] = checker(photoIds, m2b)

  // route to the methods page unless the 'none' option is picked
  for (j = 0; j < photoIds.length; j++) {
    if (photoIds[j] === 'none') {
      res.redirect('v2/fallback')
    }else if (photoIds[j] === 'UK passport') {
      res.redirect('v2/app-onboard-j1')
    }
    else {
      res.redirect('v2/app-onboard-j2')
    }
  }

})


// V1 routing
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------


// choose wether to continue or go back to RP
router.post('/v1/preauth-route', function (req, res) {
  const usegovuk = req.session.data['use-govuk-account']
  // chooses to continue
  if (usegovuk === 'yes') {
    res.redirect('preauth-checks')
  } else {
    // return to service
    req.session.data['reason'] = 'abandon'
    res.redirect('preauth-create-spinner')
  }
})


// check document
router.post('/app-photoid', function (req, res) {
  // pick up the selected docs
  const photoIds = req.session.data['id-documents']
  // work out the logic for which options to show on the next page
  let passport = ["UK passport"],
    dl = ["UK driving licence"],
    m2b = ["UK passport","UK driving licence"]

  let checker = (arr, target) => target.every(v => arr.includes(v))

  req.session.data['useiProovPP'] = checker(photoIds, passport)
  req.session.data['useiProovDL'] = checker(photoIds, dl)
  req.session.data['useM2b'] = checker(photoIds, m2b)

  // route to the methods page unless the 'none' option is picked
  for (j = 0; j < photoIds.length; j++) {
    if (photoIds[j] === 'none') {
      res.redirect('v1/pyi-kbv-intro')
    } else {
      res.redirect('v1/app-onboard')
    }
  }
})




/*
router.post('/offline-enter-mobile', function (req, res) {
  
    notify.sendSms(
      '5f76fecc-44b0-4950-bb5e-0d8e52e51cc9',
      '+447717643215',
      { personalisation: null,
        reference: null }
    ).catch(err => console.error(err)) .then(res => console.log(res))
  
  res.redirect('/offline-checkphone')
})
*/

/*
//prototype example
router.post('/email-address-page-answer', function(request, response) {

  var whichemail = request.session.data['email-address-page']
  if (whichemail !=='') {
    var personalisation = {
      'first_name': 'Amala',
      'reference_number': '300241'
    }
  
    notify.sendEmail(
      // this long string is the template ID, copy it from the template
      // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
      // in your code.
      '1e29bf2c-a39a-4fb0-ae05-3832fed5392f',
      // `emailAddress` here needs to match the name of the form field in
      // your HTML page
      request.body.emailAddress, {
        personalisation: personalisation,
        reference: ""
      }
    )
  } 
})
*/

/*
// Dual Comms Sms code ** need to add logic for checkbox
router.post('/v14/offline-checkphone', async function(request, response) {

  var whichphone = request.session.data['offline-enter-mobile']
  if (whichphone !=='') {
   
  
    await notify.sendSms(
      '5f76fecc-44b0-4950-bb5e-0d8e52e51cc9',
      request.session.data['mobileNumber']
    ).then(function() { 
      response.redirect('/v14/offline-checkphone')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    
  } else {
    response.send("No phone number provided")

  }
   
})
*/
/*
router.post('/v14/auth-create-checkphone', async function(request, response) {

  var authphone = request.session.data['auth-create-mobile']
  if (authphone !=='') {
   
  
    await notify.sendSms(
      '5f76fecc-44b0-4950-bb5e-0d8e52e51cc9',
      request.session.data['mobileNumberAuth']
    ).then(function() { 
      response.redirect('/v14/auth-create-checkphone')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    
  } else {
    response.send("No phone number provided")

  }
   
})

*/



/*
// SMS1 - sent at PO - WORKING 19:14
router.post('/v14/offline-po-process', async function(request, response) {

  var whichphone = request.session.data['offline-enter-mobile']
  var authphone = request.session.data['auth-create-mobile']

  if (whichphone !=='') {
   
  
    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumber']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    

  } else if (authphone !=='') {

    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumberAuth']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
  
  } else {
    response.send("No phone number provided")

  } 
})
*/


// SMS1 - Test with new page 'auth-create-mobile-test' - not working
/*
router.post('/v14/offline-po-process', async function(request, response) {

  //var whichphone = request.session.data['offline-enter-mobile']
  var authphone = request.session.data['auth-create-mobile-test']

  if (authphone !=='') {
   
  
    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumberauth']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    

  } else {
   
    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumber']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
  
  } 
})
*/

/*
//Swapping order - not working
router.post('/v14/offline-po-process', async function(request, response) {

  var whichphone = request.session.data['offline-enter-mobile']
  var authphone = request.session.data['auth-create-mobile']

  if (authphone !=='') {
   
  
    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumberAuth']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    

  } else if (whichphone !=='') {

    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumber']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
  
  } 
})
*/

// Separating whichphone and authpone test - work individually
/*router.post('/v14/offline-po-process', async function(request, response) {

  var whichphone = request.session.data['offline-enter-mobile']

  if (whichphone !=='') {
   
  
    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumber']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    

  } else {
    response.send("No phone number provided")

  } 
})

router.post('/v14/offline-po-process', async function(request, response) {

  var authphone = request.session.data['auth-create-mobile']

  if (authphone !=='') {
   
  
    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumberAuth']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    

  } else {
    response.send("No phone number provided")

  } 
})
*/

/*
// testing swapping order - first is working
router.post('/v14/offline-po-process', async function(request, response) {

  var authphone = request.session.data['auth-create-mobile']
  var whichphone = request.session.data['offline-enter-mobile']


  if (authphone !=='') {
   
  
    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumberAuth']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    
  
  } else if (whichphone !=='') {

    await notify.sendSms(
      '107d1929-b546-4f03-92a1-a37f89a0428b',
      request.session.data['mobileNumber']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
  
  } else {
    response.send("No phone number provided")

  } 
})
*/


/*
// SMS2 - sent after PO
router.post('/v14/offline-successful-email', async function(request, response) {

  var whichphone = request.session.data['offline-enter-mobile']
  var authphone = request.session.data['auth-create-mobile']

  if (authphone !=='' && whichphone =='') {
   
  
    await notify.sendSms(
      '7eb456b7-a03c-4930-a235-0f857f4e7f13',
      request.session.data['mobileNumberAuth']
    ).then(function() { 
      response.redirect('/v14/offline-successful-email')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
    
  } else {

    await notify.sendSms(
      '7eb456b7-a03c-4930-a235-0f857f4e7f13',
      request.session.data['mobileNumber']
    ).then(function() { 
      response.redirect('/v14/offline-successful-email')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
  } 
   
})
*/


// routing user for DFC depending on when phone number given 
router.post('/v14/offline-enter-mobile', function (req, res) {

  var enterMobile = req.session.data['security-codes']

  if (enterMobile == "Text message"){
    // Send user to next page
    res.redirect('/v14/offline-identity-phone')
  } else {
    res.redirect('/v14/offline-enter-mobile')
  }

})


/* not correct
router.post('/offline-email-confirmation', function(request, response) {

  var userphone = request.session.data['offline-enter-mobile']
  var authphone = request.session.data['auth-create-mobile']
  if (authphone == '') {
    var personalisation = {
    }
  
    notify.sendSms(
      '5f76fecc-44b0-4950-bb5e-0d8e52e51cc9',
      request.body.mobileNumber,
      { personalisation: personalisation }
    )
  }
// else use data from userphone 
  response.redirect('/v14/offline-checkphone') 
})
*/

/* 
else if (authphone !=='') {

    await notify.sendSms(
      '5f76fecc-44b0-4950-bb5e-0d8e52e51cc9',
      request.session.data['mobileNumberAuth']
    ).then(function() { 
      response.redirect('/v14/offline-po-process')
    
    })

    .catch(function(err) {
      response.redirect('/v14/offline-checkphone-error')
      
      console.error(err) 
    })
*/
