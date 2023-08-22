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

// notify email sending test 

router.post('/email-address-page', function (req, res) {

  notify.sendEmail(
    // this long string is the template ID, copy it from the template
    // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
    // in your code.
    '1e29bf2c-a39a-4fb0-ae05-3832fed5392f',
    // `emailAddress` here needs to match the name of the form field in
    // your HTML page
    req.body.emailAddress
  );

  // This is the URL the users will be redirected to once the email
  // has been sent
  res.redirect('/offline-email-confirmation');

});

// Dual comms UR - sending text messages


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
  if (req.body.mobileNumber !== '') {
    notify.sendSms(
      '5f76fecc-44b0-4950-bb5e-0d8e52e51cc9',
      req.body.mobileNumber,
      { personalisation: null }
    ).catch(err => console.error(err)) .then(res => console.log(res))
  }
  res.redirect('/offline-checkphone')
})
*/
router.post('/offline-enter-mobile', function (req, res) {
  
    notify.sendSms(
      '5f76fecc-44b0-4950-bb5e-0d8e52e51cc9',
      '+447717643215',
      { personalisation: null,
        reference: null }
    ).catch(err => console.error(err)) .then(res => console.log(res))
  
  res.redirect('/offline-checkphone')
})

