import { StatusBar } from "expo-status-bar";
import { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import Onboarding from "react-native-onboarding-swiper";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { LatoText, LatoBlackText } from "./stylesText";
import * as SplashScreen from "expo-splash-screen";

interface Page {
  backgroundColor: string;
  image: JSX.Element;
  title: JSX.Element | string;
  subtitle: JSX.Element | string;
}

function App() {
  const color: string = "#1B164E";

  const pages: Page[] = [
    {
      backgroundColor: "#C2EEAA",
      image: (
        <Image style={styles.img} source={require("./assets/step1.png")} />
      ),
      title: (
        <LatoBlackText style={{ fontSize: 30, color: color }}>
          Connect with people
        </LatoBlackText>
      ),
      subtitle: (
        <LatoText style={{ fontSize: 17, color: color }}>
          Immerse yourself with other cultures and new ways of life. Don't limit
          yourself to just travel, but instead live the experience just like a
          local
        </LatoText>
      ),
    },
    {
      backgroundColor: "#FFBACE",
      image: (
        <Image style={styles.img} source={require("./assets/step2.png")} />
      ),
      title: (
        <LatoBlackText style={{ fontSize: 30, color: color }}>
          Discover and enjoy
        </LatoBlackText>
      ),
      subtitle: (
        <LatoText style={{ fontSize: 17, color: color }}>
          Discover new places, routes, monuments, movie panramas and charming
          hideaways through the app
        </LatoText>
      ),
    },
    {
      backgroundColor: "#FDDA80",
      image: (
        <Image
          style={styles.img}
          source={require("./assets/step3.png")}
          resizeMode="cover"
        />
      ),
      title: (
        <LatoBlackText style={{ fontSize: 30, color: color }}>
          Share your experiences
        </LatoBlackText>
      ),
      subtitle: (
        <LatoText style={{ fontSize: 17, color: color }}>
          The app allows you to share your routes, upload photos and leave
          comments. Interact with other users and be apart of the traveling
          community
        </LatoText>
      ),
    },
    {
      backgroundColor: "#C6E2FF",
      image: (
        <Image
          style={styles.img}
          source={require("./assets/step4.png")}
          resizeMode="cover"
        />
      ),
      title: (
        <LatoBlackText style={{ fontSize: 30, color: color }}>
          Save your favorites
        </LatoBlackText>
      ),
      subtitle: (
        <LatoText style={{ fontSize: 17, color: color }}>
          Save the routes and places you like the most and make planning your
          trip both easy and fun
        </LatoText>
      ),
    },
  ];

  const ringStyle = [
    {
      borderTopColor: "blue",
    },
    {
      borderTopColor: "blue",
      borderRightColor: "blue",
    },
    {
      borderTopColor: "blue",
      borderRightColor: "blue",
      borderBottomColor: "blue",
    },
    {
      borderTopColor: "blue",
      borderRightColor: "blue",
      borderBottomColor: "blue",
      borderLeftColor: "blue",
    },
  ];

  const onboardingRef = useRef<Onboarding>(null);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePress = () => {
    onboardingRef.current.goNext();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 190,
          zIndex: 50,
          width: 120,
        }}
      >
        {pages.map((item, index) => {
          return (
            <View
              style={[
                styles.dot,
                { backgroundColor: index === currentPage ? "blue" : "white" },
              ]}
            ></View>
          );
        })}
      </View>
      <Onboarding
        ref={onboardingRef}
        bottomBarHeight={80}
        showPagination={false}
        onSkip={() => setCurrentPage(pages.length - 1)}
        onDone={() => setCurrentPage(pages.length - 1)}
        pageIndexCallback={(index) => setCurrentPage(index)}
        pages={pages}
        subTitleStyles={{ paddingHorizontal: 100 }}
        imageContainerStyles={{ paddingBottom: 50 }}
        containerStyles={{ justifyContent: "start", paddingTop: 70 }}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <View style={[styles.middle, ringStyle[currentPage]]}>
          <View style={styles.inner}>
            {currentPage !== 3 ? (
              <Feather name="arrow-right" size={40} color="white" />
            ) : (
              <FontAwesome6 name="check" size={40} color="white" />
            )}
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ position: "absolute", left: 20, bottom: 40 }}>
        <Button title="Skip" color="white" />
      </View>
    </View>
  );
}

const Final = () => {
  const [loaded, error] = useFonts({
    Lato: require("./assets/fonts/Lato-Regular.ttf"),
    LatoBlack: require("./assets/fonts/Lato-Black.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <App />;
};

export default Final;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  img: {
    height: 400,
    width: "100%",
  },
  outer: {
    padding: 90,
    backgroundColor: "white",
  },
  middle: {
    padding: 10,
    backgroundColor: "transparent",

    borderRadius: 100,
    borderWidth: 5,
    borderColor: "white",
    //borderTopColor : 'blue',
    transform: [{ rotate: "45deg" }],
  },
  inner: {
    padding: 16,
    backgroundColor: "blue",
    borderRadius: 100,
    transform: [{ rotate: "-45deg" }],
  },
  button: {
    padding: 10,
    borderRadius: 100,
    position: "absolute",
    bottom: 26,
  },
  dot: {
    width: 25,
    height: 6,
    borderRadius: 12,
  },
});
