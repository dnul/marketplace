import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { locations } from 'locations'
import { getMatchParams } from 'modules/location/selectors'
import { getData as getParcels } from 'modules/parcels/selectors'
import {
  getData as getEstates,
  isEstateTransactionIdle
} from 'modules/estates/selectors'
import { navigateTo } from '@dapps/modules/location/actions'

import EstateSelect from './EstateSelect'

const mapState = (state, ownProps) => {
  const { id } = getMatchParams(ownProps)
  const estates = getEstates(state)

  // TODO: AllParcels is here because we're using estate.data.parcels which comes from the API. This is not correct.
  //       The API should return estate.parcels, the reducer should split this into their domains and a selector should put it back together.
  return {
    allParcels: getParcels(state),
    pristineEstate: estates[id],
    isTxIdle: isEstateTransactionIdle(state)
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const { x, y, id } = getMatchParams(ownProps)

  return {
    onError: () => dispatch(navigateTo(locations.root())),
    onCreateCancel: () => dispatch(navigateTo(locations.parcelDetail(x, y))),
    onDeleteEstate: () => dispatch(navigateTo(locations.deleteEstate(id)))
  }
}

export default withRouter(connect(mapState, mapDispatch)(EstateSelect))
