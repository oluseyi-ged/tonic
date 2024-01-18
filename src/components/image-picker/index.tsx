import {BottomSheet} from '@components/bottom-sheet';
import {SizedBox} from '@components/sized-box';
import {SvgIcon} from '@components/svg-icon';
import {convertToUrl} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';
const ImagePickerComponent = ({
  label,
  imageDisplay,
  setImage,
  setImageUri,
  image,
}: any) => {
  // @ts-ignore
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const openGallery = () => {
    const options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
      quality: 0.5,
      maxWidth: 800,
      maxHeight: 800,
    };
    // @ts-ignore
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        // @ts-ignore
      } else if (response.error) {
        // @ts-ignore
        flash.danger({description: 'Failed  to load image'});
      } else {
        // @ts-ignore
        const source =
          'data:image/jpeg;base64,' + response?.assets?.[0]?.base64;

        // @ts-ignore
        setImage(source);
        convertToUrl(source, setImageUri, setLoading);
        setShowModal(false);
      }
    });
  };

  const takePic = async () => {
    try {
      const selfie = await takePicture();
      const img = await RNFS.readFile(selfie.uri, 'base64').then(res => {
        return res;
      });
      const source = 'data:image/jpeg;base64,' + img;

      setImage(source);
      convertToUrl(source, setImageUri, setLoading);
      setShowCamera(false);
      setShowModal(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <View>
        {label && <Text style={styles.uploadLabel}>{label}</Text>}
        <SizedBox height={10} />
        <TouchableOpacity
          style={styles.uploadBoxed}
          onPress={() => {
            setShowModal(true);
            // openGallery();
          }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              {image ? (
                <Image source={{uri: imageDisplay}} style={styles.image} />
              ) : (
                <>
                  <SvgIcon name="cloudUpload" size={44} />
                  <SizedBox height={24} />
                  <Text style={styles.uploadText}>Click to Upload</Text>
                </>
              )}
            </>
          )}
        </TouchableOpacity>
      </View>
      <BottomSheet
        dropPress={() => {
          setShowModal(false);
          setShowCamera(false);
        }}
        afterHide={() => {
          setShowModal(false);
          setShowCamera(false);
        }}
        show={showModal}
        content={
          <View style={styles.modalCover}>
            <SizedBox height={24} />
            <Text style={styles.modalText}>Select Photo</Text>
            <SizedBox height={24} />
            {showCamera ? (
              <>
                <View style={styles.cameraBox}>
                  <RNCamera
                    ref={cameraRef}
                    type={RNCamera.Constants.Type.back}
                    style={styles.preview}
                  />
                  <View style={styles.cameraCrop}>
                    <SvgIcon name="crop" size={217} />
                  </View>
                </View>
                <SizedBox height={44} />
                <SvgIcon name="shot" size={64} onPress={() => takePic()} />
              </>
            ) : (
              <View style={styles.modalFlex}>
                <TouchableOpacity
                  onPress={() => {
                    // setShowModal(false);
                    setShowCamera(true);
                  }}>
                  <SvgIcon name="shot" size={30} />
                  <SizedBox height={12} />

                  <Text style={styles.text}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openGallery}>
                  <SvgIcon name="gallery" size={30} />
                  <SizedBox height={12} />
                  <Text style={styles.text}> Gallery</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        }
        modalStyle={{}}
      />
    </>
  );
};

export default ImagePickerComponent;
