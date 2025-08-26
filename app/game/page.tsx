'use client';
import styles from "./page.module.css";
import axios from "axios";
import { useRef, useEffect, useState, useCallback } from 'react';


import BetList from '../../components/BetList2';

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';


export default function Home() {
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
		<main className={styles.main1}>
		 {/* Pass the layoutWidth as width prop */}
		
	  <BetList />
		
	  </main>
	);
}