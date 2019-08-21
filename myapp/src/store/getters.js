export default {
    isChildTransition(state){
        let s = 'slide-revers';
        if(!state.isChild){
            s = 'slide';
        }
        return s;
    }
}