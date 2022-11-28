const express = require('express')
const router = express.Router()

//radio redirect package https://github.com/abbott567/radio-button-redirect
const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

// Add your routes here - above the module.exports line
module.exports = router



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
