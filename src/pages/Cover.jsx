import React from 'react';
import {StyleSheet, css} from 'aphrodite';

// 페이지 스크롤 버그 제거
export default () => (
  <div className={css(styles.backgruond)}>
    <div className={css(styles.card)}>
      {/** business card Front Side */}
      <div className={css(styles.cardInner,styles.frontSide)}>
        <h1 className={css(styles.title)}>Dev & LifeStyles</h1>
        <p>Computer Enginner's Blog</p>
        {/* //TODO: Change to BackSide with animation,
                    when button is clicked
          */}
        <button className={css(styles.nextButton)}>
          <i className={`xi-caret-down-square-o xi-2x`} />
        </button>
      </div>
      {/* business card BackSide 
          //TODO: draw backside 
        */}
    </div>
  </div>
)

const styles = StyleSheet.create({
  backgruond: {
    width: '100%',
    height:'100%',
    backgroundColor: '#FAEBEF',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  card: {
    width: '500px',
    height: '300px',
    padding: '15px',
    backgroundColor: '#333D79',
    borderRadius: '15px',
    boxShadow: '3px 3px 3px 2px gray',
    color: '#FAEBEF',
  },
  cardInner: {
    height: '100%',
    marginBottom: '20px',
  },
  frontSide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    margin: 0,
  },
  nextButton: {
    border: 0,
    backgroundColor: '#00000000',
    color: '#FAEBEF',
    position: 'absolute',
    bottom: '0px',
    ":focus" : {
      outline: 0,
    },
  },
});
