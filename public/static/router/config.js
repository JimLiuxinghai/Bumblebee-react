import Bundle from "Components/bundle";

export default [{
    path: '/home',
    exact: false,
    component(props) {
        return <Bundle { ...props } load = {() => import('../pages/home')}/>;
    }
}]