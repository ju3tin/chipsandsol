'use client';
import styles from "./page.module.css";
import axios from "axios";
import { useRef, useEffect, useState, useCallback } from 'react';

import Game from '../../components/Game2';


export default function Game() {
	const [layoutWidth, setLayoutWidth] = useState(0);

	useEffect(() => {
		const handleResize = () => {
		  setLayoutWidth(window.innerWidth); // Get width dynamically
		};
	
		// Initial load
		handleResize();
	
		// Listen for resize events
		window.addEventListener('resize', handleResize);
	
		return () => {
		  window.removeEventListener('resize', handleResize); // Cleanup
		};
	  }, []);
	

	return (
	 {/* Pass the layoutWidth as width prop */}
		
	  <Game />
	
	);
}