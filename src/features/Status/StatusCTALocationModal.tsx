import React from 'react';

import { Box } from '@rebass/grid';
import { H1, H2, ConfirmModal } from '../../shared/Elements';
import { Label, Input, StyledSelect } from '../../shared/Form';

import {
    CountriesLVpair,
  } from '../../config/countries';
  import {
    TimeZonesLVpair,
  } from '../../config/timeZones';

  interface StatusCTALocationModalProps {
      isModalOpen: boolean;
      onCanceled: any;
      onConfirmed: any;
      timeZone: string;
      country: string;
      city: string;
      handleChangeTimeZone: any;
      handleChangeCountry: any;
      handleChangeCity: any;
  }

const StatusCTALocationModal: React.FC<StatusCTALocationModalProps> = (props) => {
    return (
        <ConfirmModal
          isOpen={props.isModalOpen}
          onCanceled={props.onCanceled}
          onConfirmed={props.onConfirmed}
          cancelLabel="Cancel"
          confirmLabel="Confirm"
        >
          <Box mb={'10px'} alignSelf={'center'}>
            <H1 textAlign="center" marginBottom="32px">Confirm your spot</H1>
            <H2 fontSize="1rem" color="#4D4D4D" marginBottom="32px">Please let us know where you'll be hacking from</H2>
          </Box>
          <Box mb={'10px'} alignSelf={'center'}>
            <Label style={{ minWidth: '300px', maxWidth: '300px', marginBottom: '1em' }}>
              What is your time zone?
              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"
                options={TimeZonesLVpair}
                onChange={props.handleChangeTimeZone}
                value={{
                  label: props.timeZone,
                  value: props.timeZone
                }}
              />
            </Label>
          </Box>
          <Box mb={'10px'} alignSelf={'center'}>
            <Label style={{ minWidth: '300px', maxWidth: '300px' }}>
              In which country are you currently residing?
              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"              
                options={CountriesLVpair}
                onChange={props.handleChangeCountry}
                value={{
                  label: props.country,
                  value: props.country
                }}
              />
            </Label>
          </Box>
          <Box mb={'10px'} alignSelf={'center'}>
            <Label style={{ minWidth: '300px', maxWidth: '300px' }}>
              In which city are you currently residing?
              <Input
                onChange={props.handleChangeCity}
                value={props.city}
              />
            </Label>
          </Box>
        </ConfirmModal>
    )
}

export default StatusCTALocationModal;
