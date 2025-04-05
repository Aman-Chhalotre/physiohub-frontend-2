import LottiePlayer from "../animations/LottiePlayer";
import run from "../animations/data/Run.json";

export default function SignInBanner() {
    return (
      <div className="flex items-center mb-5 p-4 bg-gradient-to-r from-purple-700 to-purple-500 rounded-lg shadow-md text-white">
        <LottiePlayer animationFile={run} width="50px" height="50px" />
        <div className="ml-4 flex-1">
          <h2 className="font-semibold text-lg">Sign in and track your progress</h2>
          <p className="text-sm opacity-80">
            PhysioHub provides its members a dedicated dashboard to track their progress, 
            view their learning history and save articles for later.
          </p>
        </div>
        <button className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-full shadow-md">
          Sign in
        </button>
      </div>
    );
  }
  