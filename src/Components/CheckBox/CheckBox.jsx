import React from 'react';
import {noop} from 'lodash';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const CheckBox = ({checked, onClickHandler=noop}) => {
	return <CheckCircleIcon onClick={onClickHandler} style={{ color: checked ? "#64b5b9" : 'rgb(208 220 221)', cursor: 'pointer', marginRight: 16, fontSize: 'larger', padding: '8px 0' }} />
};

export default CheckBox