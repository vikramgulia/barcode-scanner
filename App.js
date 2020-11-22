// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';

export default function App() {

  const [flashMode, setFlashMode] = useState('auto');
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanned, setScanned] = useState(false);
  const [cameraStatus, setCameraStatus] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleTorch = () => {
    const torchStatus = flashMode === 'on' ? 'off' : 'on';
    setFlashMode(torchStatus);
  }

  const onBarCodeRead = (e) => {
    setScanned(true);
    Alert.alert("Barcode value is: " + e.data, "Barcode type is: " + e.type);
  }

  const closeCamera = () => {
    setCameraStatus(false);
  }

  const showCamera = () => {
    setCameraStatus(true);
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {cameraStatus ? <View style={styles.container}>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1 }} type={type} flashMode={flashMode}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned ? undefined : onBarCodeRead}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              height: 25,
              width: 25,
              borderRadius: 50,
              left: 30,
              right: 0,
              top: 50,
              bottom: 0,
              backgroundColor: "#fff",
              paddingLeft: 5
            }}
            onPress={closeCamera}
          >
            <Ionicons name="md-close" size={25} color="black" />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 16, marginBottom: 50, color: 'white' }}> {type === Camera.Constants.Type.back ? "Front" : "Back"} </Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={toggleTorch}>
            <Text style={{ fontSize: 16, marginBottom: 50, color: 'white' }}> Flash </Text>
          </TouchableOpacity> */}
        </Camera>
        <View style={styles.fixToText}>
          <Button title="Flip" style={styles.buttonCamera}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }} />
          <Button title="Scan Code" style={styles.buttonCamera}
            onPress={() => setScanned(false)}
          />
          <Button title={'Torch'} style={styles.buttonTorch}
            onPress={toggleTorch} />
        </View>
      </View> : <View style={styles.container}>
          <Button onPress={showCamera} title="Show Camera" />
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40
  },
  closeButton: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff"
  },
  bottomOverlay: {
    position: "absolute",
    width: "100%",
    flex: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonCamera: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonTorch: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  }
});
