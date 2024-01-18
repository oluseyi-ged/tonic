/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { flash } from './FlashMessageHelpers';

export * from './consts';
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WEIGHT = Dimensions.get('window').width;

export function RF(
  size: number,
  scale: number = Platform.OS === 'android' ? 2 : 4,
) {
  let factor = PixelRatio.get();
  factor > 2.2 ? (factor = 2) : null;
  let font = ((factor * SCREEN_WEIGHT) / 1000) * size;
  return font + 6;
}

export const getWidthPercentage = (
  value: number,
  creativeWidth = SCREEN_WEIGHT,
) => (value / creativeWidth) * 100;

export const getHeightPercentage = (
  value: number,
  creativeHeight = SCREEN_WEIGHT,
) => (value / creativeHeight) * 100;

export function HDP(size: number) {
  return PixelRatio.roundToNearestPixel(size);
}

export function MH(height: number) {
  return (height / 100) * SCREEN_HEIGHT;
}

export function WP(size: number) {
  return widthPercentageToDP(size);
}

export function HP(size: number) {
  return heightPercentageToDP(size);
}

// new
export const RW = (value: number) => {
  return widthPercentageToDP(getWidthPercentage(value));
};

export const RH = (value: number) => {
  return heightPercentageToDP(getHeightPercentage(value));
};
export const convertToUrl = async (image, setFunction, setLoading) => {
  setLoading(true);
  try {
    let imgdata = {
      file: image,
      upload_preset: 'fznurftp',
    };

    fetch('https://api.cloudinary.com/v1_1/dkb3vq7ai/upload', {
      body: JSON.stringify(imgdata),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(async r => {
        setLoading(false);
        let resdata = await r.json();
        setFunction(resdata.url);
        console.log(resdata.url)
        flash.success({ description: 'Image Loaded' });
      })
      .catch(err => console.log(err));

    // singleUpload({
    //   file: `data:image/png;base64,${image}`,
    // });
  } catch (err) {
    setLoading(false);
    flash.danger({ description: 'Failed  to load image' });
    console.log(err)

  }
};

export const checkVerification = (name, data: any) => {
  if (name === 'BVN Verification') {
    return data?.profile?.bvnVerified === 'APPROVED'
      ? 'Verified'
      : 'Not Verified';
  } else if (name === 'Address Verification') {
    return data?.profile?.addressVerified === 'APPROVED'
      ? 'Verified'
      : 'Not Verified';
  } else if (name === 'ID Verification') {
    return data?.profile?.idVerified === 'APPROVED' ? 'Verified' : 'Not Verified';
  }
};
export const checkVerificationStatus = (data: any) => {
  return (
    data?.profile?.bvnVerified === 'APPROVED' &&
    data?.profile?.addressVerified === 'APPROVED' &&
    data?.profile?.idVerified === 'APPROVED'
  );
};
