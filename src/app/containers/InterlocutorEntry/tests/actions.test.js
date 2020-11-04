/* eslint-disable */

import {
  addCommunication,
  replaceCommunications,
  setPastFeaturesHistory,
  setPastTreatmentHistory,
  updateCommunicationStatus,
  updateInterlocutorAddress1,
  updateInterlocutorAddress2,
  updateInterlocutorCategory,
  updateInterlocutorCity,
  updateInterlocutorContactDetail,
  updateInterlocutorCountry,
  updateInterlocutorDirection,
  updateInterlocutorGeometry,
  updateInterlocutorISOCountry,
  updateInterlocutorLocation,
  updateInterlocutorMedium,
  updateInterlocutorMediumDetail,
  updateInterlocutorName,
  updateInterlocutorOrganisation,
  updateInterlocutorPlaceId,
  updateInterlocutorPostcode,
  updateInterlocutorState,
  updateInterlocutorTelephone,
} from '../actions';

describe('App Actions', () => {
  const mockedDate = new Date(2018, 2, 4, 4, 59, 13, 805);
  const spi = {
    name: 'SPI Name',
    id: 'spi1',
    siteId: '8',
  };
  global.Date = jest.fn(() => mockedDate);
   describe('Interlocutor action creators', () => {
    it('addCommunication', () => {
      expect(addCommunication(1, spi)).toMatchSnapshot();
    });
     it('replaceCommunications', () => {
       expect(replaceCommunications(1, [{}, {}])).toMatchSnapshot();
     });
     it('setPastFeaturesHistory', () => {
       expect(setPastFeaturesHistory(1, [{}, {}])).toMatchSnapshot();
     });
     it('setPastTreatmentHistory', () => {
       expect(setPastTreatmentHistory(1, [{}, {}])).toMatchSnapshot();
     });
     it('updateCommunicationStatus', () => {
       expect(updateCommunicationStatus(1, 'status')).toMatchSnapshot();
     });
     it('updateInterlocutorAddress1', () => {
       expect(updateInterlocutorAddress1(1, 'address 1')).toMatchSnapshot();
     });
     it('updateInterlocutorAddress2', () => {
       expect(updateInterlocutorAddress2(1, 'address 2')).toMatchSnapshot();
     });
     it('updateInterlocutorCategory', () => {
       expect(updateInterlocutorCategory(1, 'category')).toMatchSnapshot();
     });
     it('updateInterlocutorCity', () => {
       expect(updateInterlocutorCity(1, 'city')).toMatchSnapshot();
     });
     it('updateInterlocutorContactDetail', () => {
       expect(updateInterlocutorContactDetail(1, 'contact detail')).toMatchSnapshot();
     });
     it('updateInterlocutorCountry', () => {
       expect(updateInterlocutorCountry(1, 'country')).toMatchSnapshot();
     });
     it('updateInterlocutorDirection', () => {
       expect(updateInterlocutorDirection(1, 'direction')).toMatchSnapshot();
     });
     it('updateInterlocutorGeometry', () => {
       expect(updateInterlocutorGeometry(1, {})).toMatchSnapshot();
     });
     it('updateInterlocutorISOCountry', () => {
       expect(updateInterlocutorISOCountry(1, 'AU')).toMatchSnapshot();
     });
     it('updateInterlocutorLocation', () => {
       expect(updateInterlocutorLocation(1, 'location')).toMatchSnapshot();
     });
     it('updateInterlocutorMedium', () => {
       expect(updateInterlocutorMedium(1, 'medium')).toMatchSnapshot();
     });
     it('updateInterlocutorMediumDetail', () => {
       expect(updateInterlocutorMediumDetail(1, 'medium detail')).toMatchSnapshot();
     });
     it('updateInterlocutorName', () => {
       expect(updateInterlocutorName(1, 'caller name')).toMatchSnapshot();
     });
     it('updateInterlocutorOrganisation', () => {
       expect(updateInterlocutorOrganisation(1, 'org')).toMatchSnapshot();
     });
     it('updateInterlocutorPlaceId', () => {
       expect(updateInterlocutorPlaceId(1, 'placeid')).toMatchSnapshot();
     });
     it('updateInterlocutorPostcode', () => {
       expect(updateInterlocutorPostcode(1, 'postcode')).toMatchSnapshot();
     });
     it('updateInterlocutorState', () => {
       expect(updateInterlocutorState(1, 'state')).toMatchSnapshot();
     });
     it('updateInterlocutorTelephone', () => {
       expect(updateInterlocutorTelephone(1, 'telephone')).toMatchSnapshot();
     });
  });
});
