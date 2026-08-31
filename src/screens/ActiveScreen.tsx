import { useApp } from "../context/AppContext";
import { SplashScreen } from "./SplashScreen";
import { AuthScreen } from "./AuthScreen";
import { OnboardingScreen } from "./OnboardingScreen";
import { HomeScreen } from "./HomeScreen";
import { LibraryScreen } from "./LibraryScreen";
import { ProgramDetailScreen } from "./ProgramDetailScreen";
import { CheckoutScreen } from "./CheckoutScreen";
import { PurchaseConfirmScreen } from "./PurchaseConfirmScreen";
import { WorkoutDetailScreen } from "./WorkoutDetailScreen";
import { ActiveWorkoutScreen } from "./ActiveWorkoutScreen";
import { WorkoutCompleteScreen } from "./WorkoutCompleteScreen";
import { ProgressScreen } from "./ProgressScreen";
import { PhotoUploadScreen } from "./PhotoUploadScreen";
import { PhotoCompareScreen } from "./PhotoCompareScreen";
import { CalendarScreen } from "./CalendarScreen";
import { MessagesScreen } from "./MessagesScreen";
import {
  EditProfileScreen,
  HelpScreen,
  NotificationsScreen,
  ProfileScreen,
  SubscriptionScreen,
} from "./ProfileScreens";

export function ActiveScreen() {
  const { screen } = useApp();
  switch (screen.name) {
    case "splash":
      return <SplashScreen />;
    case "auth":
      return <AuthScreen />;
    case "onboarding":
      return <OnboardingScreen />;
    case "home":
      return <HomeScreen />;
    case "library":
      return <LibraryScreen />;
    case "programDetail":
      return <ProgramDetailScreen />;
    case "checkout":
      return <CheckoutScreen />;
    case "purchaseConfirm":
      return <PurchaseConfirmScreen />;
    case "workoutDetail":
      return <WorkoutDetailScreen />;
    case "activeWorkout":
      return <ActiveWorkoutScreen />;
    case "workoutComplete":
      return <WorkoutCompleteScreen />;
    case "progress":
      return <ProgressScreen />;
    case "photoUpload":
      return <PhotoUploadScreen />;
    case "photoCompare":
      return <PhotoCompareScreen />;
    case "calendar":
      return <CalendarScreen />;
    case "messages":
      return <MessagesScreen />;
    case "profile":
      return <ProfileScreen />;
    case "editProfile":
      return <EditProfileScreen />;
    case "subscription":
      return <SubscriptionScreen />;
    case "notifications":
      return <NotificationsScreen />;
    case "help":
      return <HelpScreen />;
    default:
      return <HomeScreen />;
  }
}
