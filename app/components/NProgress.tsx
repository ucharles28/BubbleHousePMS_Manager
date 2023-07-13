import ProgressBar from "next-nprogress-bar";

export default function NProgress() {
    return (
        <ProgressBar
            height="4px"
            color="#F5C400"
            options={{ showSpinner: true }}
            shallowRouting
            appDirectory
        />
    );
}