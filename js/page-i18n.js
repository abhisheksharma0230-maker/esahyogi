const pageTranslations = {
  en: {
    statsTitle: 'System Statistics',
    statsSubtitle: 'Real-time analytics and progress tracking',
    statLabels: ['Total Complaints', 'Pending Cases', 'Resolved', 'Active Users'],
    trackTitle: 'Track Complaint Status',
    trackSubtitle: 'Check the current status and progress of your complaint',
    servicesTitle: 'Our Services',
    aboutTitle: 'About Us',
    teamTitle: 'Our Team',
    contactTitle: 'Contact Us',
    contactSubtitle: 'Get in touch with us for support and assistance',
    complaintTitle: 'File New Complaint',
    complaintSubtitle: 'Please fill out the detailed complaint information form',
    complaintDetailsHeading: 'Your Details',
    complaintName: 'Your Name',
    complaintNamePlaceholder: 'Enter full name',
    complaintEmail: 'Email Address',
    complaintEmailPlaceholder: 'Enter your email address',
    complaintPhone: 'Phone Number',
    complaintPhonePlaceholder: '+91 XXXXX XXXXX',
    complaintState: 'State',
    complaintCity: 'City',
    complaintPincode: 'PIN Code',
    complaintPincodePlaceholder: 'Enter 6-digit pincode',
    complaintArea: 'Area',
    complaintAreaPlaceholder: 'Enter area or it will be auto-filled from PIN',
    trackLabel: 'Enter Tracking ID',
    trackPlaceholder: 'Example: CMP-1001',
    search: 'Search',
    servicesSubtitle: 'Digital services for citizens with AI-powered solutions',
    serviceCards: [
      {
        title: 'Complaint Registration',
        description: 'Instant registration of all types of civic complaints with AI-powered routing system',
        bullets: ['24/7 Availability', 'Free Service', 'Instant Acknowledgment', 'Unique Tracking ID']
      },
      {
        title: 'Status Tracking',
        description: 'Real-time complaint status monitoring with detailed progress updates',
        bullets: ['Live Status Updates', 'SMS/Email Alerts', 'Progress Timeline', 'Department Contact Info']
      },
      {
        title: 'AI Assistant',
        description: 'Artificial Intelligence powered smart routing and automated department selection',
        bullets: ['Instant Department Selection', '95% Accuracy Rate', 'Faster Processing', 'Voice Recognition Support']
      },
      {
        title: 'Mobile Ready',
        description: 'Fully responsive design that works perfectly on all devices and screen sizes',
        bullets: ['Mobile Responsive', 'Touch-Friendly Interface', 'Fast Loading', 'Cross-Platform Support']
      }
    ],
    aboutSubtitle: 'Part of the Digital India Initiative',
    aboutSections: {
      titles: ['What is 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊?', 'Our Mission', 'Technical Features']
    },
    teamSubtitle: 'Dedicated to building a better digital India through innovative technology solutions',
    teamStats: ['Digital India Initiative', 'Service Availability', 'AI Accuracy Rate', 'Languages Supported'],
    teamRoles: [
      'Senior Full-Stack Developer',
      'Frontend Developer & UI/UX Designer',
      'Backend Developer & Database Specialist',
      'AI/ML Engineer & NLP Specialist'
    ],
    privacyTitle: 'Privacy Policy',
    privacySubtitle: 'Your privacy and data security is our top priority',
    stateDefault: 'Select State',
    cityDefault: 'Select State First',
    phoneHelp: 'Enter 10 digits only (e.g., 9876543210)',
    pincodeHelp: 'Enter 6-digit PIN code',
    areaHelp: 'Enter area manually or it will be auto-filled from PIN code',
    priorityDefault: 'Select Priority',
    priorityOptions: ['Low - General Issue', 'Medium - Important Matter', 'High - Requires Immediate Attention', 'Urgent - Emergency Situation'],
    categoryDefault: 'Select Category',
    categoryOptions: [
      'Roads & Transportation',
      'Electricity & Power',
      'Water Supply & Sanitation',
      'Waste Management',
      'Healthcare Services',
      'Education',
      'Police & Security',
      'Corruption & Misconduct',
      'Other Issues'
    ],
    departmentDefault: 'Select Department',
    departmentOptions: [
      'Municipal Corporation',
      'Public Works Department',
      'State Electricity Board',
      'Water & Sanitation Department',
      'Police Department',
      'Health & Medical Services',
      'Education Department',
      'Anti-Corruption Bureau'
    ],
    fileUploadText: 'Drag files here or click to upload',
    fileUploadHelp: 'Supported: JPG, PNG, MP3, WAV, MP4 (Max 10MB per file)',
    captchaRefresh: 'Refresh',
    captchaHelp: 'Please enter the code shown above to verify you are human',
    contactHeadquarters: 'Headquarters',
    contactHelpline: 'Helpline',
    contactEmail: 'Email',
    contactSocial: 'Social Media',
    responseTime: 'Response Time',
    responseTimeText: 'We typically respond within 2-4 hours during business hours and within 24 hours on weekends.',
    sendMessage: 'Send Message',
    contactName: 'Your Name *',
    contactNamePlaceholder: 'Enter your full name',
    contactEmailLabel: 'Email Address *',
    contactEmailPlaceholder: 'Enter your email address',
    contactMobile: 'Mobile Number (10 digits only)',
    contactMobilePlaceholder: 'Enter 10-digit mobile number',
    contactMobileHelp: 'Enter 10 digits only',
    contactSubject: 'Subject *',
    contactSubjectDefault: 'Choose a subject *',
    contactSubjectOptions: ['Technical Support', 'Complaint Related', 'Feedback & Suggestions', 'Partnership Inquiry', 'Other'],
    contactMessage: 'Your Message *',
    contactMessagePlaceholder: 'Please describe your query or message in detail...',
    sendMessageButton: 'Send Message',
    contactNote: 'All messages are reviewed by our team. For urgent issues, please call our helpline directly.',
    helplineAvailability: '(24/7 Available)',
    helplineSchedule: 'Monday to Sunday: Round-the-clock service'
  },
  hi: {
    statsTitle: 'सिस्टम आँकड़े',
    statsSubtitle: 'रीयल-टाइम विश्लेषण और प्रगति ट्रैकिंग',
    statLabels: ['कुल शिकायतें', 'लंबित मामले', 'समाधान हुआ', 'सक्रिय उपयोगकर्ता'],
    trackTitle: 'शिकायत स्थिति ट्रैक करें',
    trackSubtitle: 'अपनी शिकायत की वर्तमान स्थिति और प्रगति देखें',
    servicesTitle: 'हमारी सेवाएँ',
    aboutTitle: 'हमारे बारे में',
    teamTitle: 'हमारी टीम',
    contactTitle: 'संपर्क करें',
    contactSubtitle: 'सहायता और समर्थन के लिए हमसे जुड़ें',
    complaintTitle: 'नई शिकायत दर्ज करें',
    complaintSubtitle: 'कृपया शिकायत की विस्तृत जानकारी भरें',
    complaintDetailsHeading: 'आपका विवरण',
    complaintName: 'आपका नाम',
    complaintNamePlaceholder: 'पूरा नाम दर्ज करें',
    complaintEmail: 'ईमेल पता',
    complaintEmailPlaceholder: 'अपना ईमेल पता दर्ज करें',
    complaintPhone: 'फोन नंबर',
    complaintPhonePlaceholder: '+91 XXXXX XXXXX',
    complaintState: 'राज्य',
    complaintCity: 'शहर',
    complaintPincode: 'पिन कोड',
    complaintPincodePlaceholder: '6 अंकों का पिन कोड दर्ज करें',
    complaintArea: 'क्षेत्र',
    complaintAreaPlaceholder: 'क्षेत्र दर्ज करें या PIN से स्वतः भरेगा',
    trackLabel: 'ट्रैकिंग आईडी दर्ज करें',
    trackPlaceholder: 'उदाहरण: CMP-1001',
    search: 'खोजें',
    servicesSubtitle: 'नागरिकों के लिए एआई-संचालित डिजिटल सेवाएँ',
    serviceCards: [
      {
        title: 'शिकायत पंजीकरण',
        description: 'एआई आधारित रूटिंग सिस्टम के साथ सभी प्रकार की नागरिक शिकायतों का त्वरित पंजीकरण',
        bullets: ['24/7 उपलब्धता', 'निःशुल्क सेवा', 'तुरंत पावती', 'यूनिक ट्रैकिंग आईडी']
      },
      {
        title: 'स्थिति ट्रैकिंग',
        description: 'विस्तृत प्रगति अपडेट के साथ शिकायत की रीयल-टाइम निगरानी',
        bullets: ['लाइव स्टेटस अपडेट', 'SMS/ईमेल अलर्ट', 'प्रगति टाइमलाइन', 'विभाग संपर्क जानकारी']
      },
      {
        title: 'एआई सहायक',
        description: 'स्मार्ट रूटिंग और स्वचालित विभाग चयन के लिए आर्टिफिशियल इंटेलिजेंस',
        bullets: ['तुरंत विभाग चयन', '95% सटीकता दर', 'तेज़ प्रोसेसिंग', 'वॉइस रिकग्निशन सपोर्ट']
      },
      {
        title: 'मोबाइल रेडी',
        description: 'ऐसा responsive design जो सभी devices और screen sizes पर सही काम करे',
        bullets: ['मोबाइल responsive', 'टच-फ्रेंडली इंटरफेस', 'फास्ट लोडिंग', 'क्रॉस-प्लेटफॉर्म सपोर्ट']
      }
    ],
    aboutSubtitle: 'डिजिटल इंडिया पहल का हिस्सा',
    aboutSections: {
      titles: ['𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 क्या है?', 'हमारा मिशन', 'तकनीकी विशेषताएँ']
    },
    teamSubtitle: 'नवोन्मेषी तकनीक के माध्यम से बेहतर डिजिटल भारत बनाने के लिए समर्पित',
    teamStats: ['डिजिटल इंडिया पहल', 'सेवा उपलब्धता', 'एआई सटीकता दर', 'समर्थित भाषाएँ'],
    teamRoles: [
      'सीनियर फुल-स्टैक डेवलपर',
      'फ्रंटेंड डेवलपर और UI/UX डिज़ाइनर',
      'बैकेंड डेवलपर और डेटाबेस विशेषज्ञ',
      'एआई/एमएल इंजीनियर और NLP विशेषज्ञ'
    ],
    privacyTitle: 'गोपनीयता नीति',
    privacySubtitle: 'आपकी गोपनीयता और डेटा सुरक्षा हमारी सर्वोच्च प्राथमिकता है',
    stateDefault: 'राज्य चुनें',
    cityDefault: 'पहले राज्य चुनें',
    phoneHelp: 'केवल 10 अंक दर्ज करें (जैसे, 9876543210)',
    pincodeHelp: '6 अंकों का पिन कोड दर्ज करें',
    areaHelp: 'क्षेत्र स्वयं दर्ज करें या पिन कोड से स्वतः भर जाएगा',
    priorityDefault: 'प्राथमिकता चुनें',
    priorityOptions: ['निम्न - सामान्य समस्या', 'मध्यम - महत्वपूर्ण मामला', 'उच्च - तत्काल ध्यान आवश्यक', 'अत्यावश्यक - आपात स्थिति'],
    categoryDefault: 'श्रेणी चुनें',
    categoryOptions: ['सड़क और परिवहन', 'बिजली और ऊर्जा', 'जल आपूर्ति और स्वच्छता', 'कचरा प्रबंधन', 'स्वास्थ्य सेवाएँ', 'शिक्षा', 'पुलिस और सुरक्षा', 'भ्रष्टाचार और कदाचार', 'अन्य समस्याएँ'],
    departmentDefault: 'विभाग चुनें',
    departmentOptions: ['नगर निगम', 'लोक निर्माण विभाग', 'राज्य बिजली बोर्ड', 'जल और स्वच्छता विभाग', 'पुलिस विभाग', 'स्वास्थ्य और चिकित्सा सेवाएँ', 'शिक्षा विभाग', 'भ्रष्टाचार निरोधक ब्यूरो'],
    fileUploadText: 'फाइलें यहाँ खींचें या अपलोड करने के लिए क्लिक करें',
    fileUploadHelp: 'समर्थित: JPG, PNG, MP3, WAV, MP4 (प्रति फाइल अधिकतम 10MB)',
    captchaRefresh: 'रीफ्रेश',
    captchaHelp: 'कृपया मानव सत्यापन के लिए ऊपर दिखाया गया कोड दर्ज करें',
    contactHeadquarters: 'मुख्यालय',
    contactHelpline: 'हेल्पलाइन',
    contactEmail: 'ईमेल',
    contactSocial: 'सोशल मीडिया',
    responseTime: 'प्रतिक्रिया समय',
    responseTimeText: 'हम सामान्य समय में 2-4 घंटे के भीतर और सप्ताहांत में 24 घंटे के भीतर उत्तर देते हैं।',
    sendMessage: 'संदेश भेजें',
    contactName: 'आपका नाम *',
    contactNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
    contactEmailLabel: 'ईमेल पता *',
    contactEmailPlaceholder: 'अपना ईमेल पता दर्ज करें',
    contactMobile: 'मोबाइल नंबर (केवल 10 अंक)',
    contactMobilePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
    contactMobileHelp: 'केवल 10 अंक दर्ज करें',
    contactSubject: 'विषय *',
    contactSubjectDefault: 'विषय चुनें *',
    contactSubjectOptions: ['तकनीकी सहायता', 'शिकायत से संबंधित', 'फीडबैक और सुझाव', 'साझेदारी संबंधी पूछताछ', 'अन्य'],
    contactMessage: 'आपका संदेश *',
    contactMessagePlaceholder: 'कृपया अपनी समस्या या संदेश विस्तार से लिखें...',
    sendMessageButton: 'संदेश भेजें',
    contactNote: 'सभी संदेश हमारी टीम द्वारा देखे जाते हैं। जरूरी मामलों में कृपया सीधे हेल्पलाइन पर कॉल करें।',
    helplineAvailability: '(24/7 उपलब्ध)',
    helplineSchedule: 'सोमवार से रविवार: चौबीसों घंटे सेवा'
  },
  hinglish: {
    statsTitle: 'System Statistics',
    statsSubtitle: 'Real-time analytics aur progress tracking',
    statLabels: ['Total Complaints', 'Pending Cases', 'Resolved', 'Active Users'],
    trackTitle: 'Complaint Status Track karein',
    trackSubtitle: 'Apni complaint ki current status aur progress check karein',
    servicesTitle: 'Hamari Services',
    aboutTitle: 'Hamare Baare Mein',
    teamTitle: 'Hamari Team',
    contactTitle: 'Contact karein',
    contactSubtitle: 'Support aur assistance ke liye humse baat karein',
    complaintTitle: 'Nayi Complaint Darj Karein',
    complaintSubtitle: 'Please complaint ki detailed information form me bharein',
    complaintDetailsHeading: 'Aapki Details',
    complaintName: 'Aapka Naam',
    complaintNamePlaceholder: 'Full name enter karein',
    complaintEmail: 'Email Address',
    complaintEmailPlaceholder: 'your.email@example.com',
    complaintPhone: 'Phone Number',
    complaintPhonePlaceholder: '+91 XXXXX XXXXX',
    complaintState: 'State',
    complaintCity: 'City',
    complaintPincode: 'PIN Code',
    complaintPincodePlaceholder: '6-digit pincode enter karein',
    complaintArea: 'Area',
    complaintAreaPlaceholder: 'Area enter karein ya PIN se auto-fill ho jayega',
    trackLabel: 'Tracking ID Enter karein',
    trackPlaceholder: 'Example: CMP-1001',
    search: 'Search',
    servicesSubtitle: 'Citizens ke liye AI-powered digital services',
    serviceCards: [
      {
        title: 'Complaint Registration',
        description: 'AI routing system ke saath har type ki civic complaint ka instant registration',
        bullets: ['24/7 Availability', 'Free Service', 'Instant Acknowledgment', 'Unique Tracking ID']
      },
      {
        title: 'Status Tracking',
        description: 'Detailed progress updates ke saath real-time complaint status monitoring',
        bullets: ['Live Status Updates', 'SMS/Email Alerts', 'Progress Timeline', 'Department Contact Info']
      },
      {
        title: 'AI Assistant',
        description: 'Smart routing aur automatic department selection ke liye Artificial Intelligence',
        bullets: ['Instant Department Selection', '95% Accuracy Rate', 'Faster Processing', 'Voice Recognition Support']
      },
      {
        title: 'Mobile Ready',
        description: 'Fully responsive design jo sab devices aur screen sizes par sahi chale',
        bullets: ['Mobile Responsive', 'Touch-Friendly Interface', 'Fast Loading', 'Cross-Platform Support']
      }
    ],
    aboutSubtitle: 'Digital India initiative ka part',
    aboutSections: {
      titles: ['𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 kya hai?', 'Hamara mission', 'Technical features']
    },
    teamSubtitle: 'Innovative technology solutions ke through better digital India banane ke liye dedicated',
    teamStats: ['Digital India Initiative', 'Service Availability', 'AI Accuracy Rate', 'Languages Supported'],
    teamRoles: [
      'Senior Full-Stack Developer',
      'Frontend Developer & UI/UX Designer',
      'Backend Developer & Database Specialist',
      'AI/ML Engineer & NLP Specialist'
    ],
    privacyTitle: 'Privacy Policy',
    privacySubtitle: 'Aapki privacy aur data security hamari top priority hai',
    stateDefault: 'State Select karein',
    cityDefault: 'Pehle State Select karein',
    phoneHelp: 'Sirf 10 digits daalein (jaise 9876543210)',
    pincodeHelp: '6-digit PIN code enter karein',
    areaHelp: 'Area manually daalein ya PIN code se auto-fill ho jayega',
    priorityDefault: 'Priority Select karein',
    priorityOptions: ['Low - General issue', 'Medium - Important matter', 'High - Immediate attention needed', 'Urgent - Emergency situation'],
    categoryDefault: 'Category Select karein',
    categoryOptions: ['Roads & Transport', 'Electricity & Power', 'Water Supply & Sanitation', 'Waste Management', 'Healthcare Services', 'Education', 'Police & Security', 'Corruption & Misconduct', 'Other Issues'],
    departmentDefault: 'Department Select karein',
    departmentOptions: ['Municipal Corporation', 'Public Works Department', 'State Electricity Board', 'Water & Sanitation Department', 'Police Department', 'Health & Medical Services', 'Education Department', 'Anti-Corruption Bureau'],
    fileUploadText: 'Files yahan drag karein ya upload ke liye click karein',
    fileUploadHelp: 'Supported: JPG, PNG, MP3, WAV, MP4 (per file max 10MB)',
    captchaRefresh: 'Refresh',
    captchaHelp: 'Human verify karne ke liye upar dikhaya gaya code enter karein',
    contactHeadquarters: 'Headquarters',
    contactHelpline: 'Helpline',
    contactEmail: 'Email',
    contactSocial: 'Social Media',
    responseTime: 'Response Time',
    responseTimeText: 'Hum business hours me 2-4 hours ke andar aur weekends me 24 hours ke andar response dete hain.',
    sendMessage: 'Message Bhejein',
    contactName: 'Aapka Naam *',
    contactNamePlaceholder: 'Apna full name enter karein',
    contactEmailLabel: 'Email Address *',
    contactEmailPlaceholder: 'Apna email address enter karein',
    contactMobile: 'Mobile Number (sirf 10 digits)',
    contactMobilePlaceholder: '10-digit mobile number enter karein',
    contactMobileHelp: 'Sirf 10 digits enter karein',
    contactSubject: 'Subject *',
    contactSubjectDefault: 'Subject choose karein *',
    contactSubjectOptions: ['Technical Support', 'Complaint Related', 'Feedback & Suggestions', 'Partnership Inquiry', 'Other'],
    contactMessage: 'Aapka Message *',
    contactMessagePlaceholder: 'Please apni query ya message detail me likhein...',
    sendMessageButton: 'Message Bhejein',
    contactNote: 'Saare messages hamari team review karti hai. Urgent issue ke liye direct helpline par call karein.',
    helplineAvailability: '(24/7 Available)',
    helplineSchedule: 'Monday se Sunday: Round-the-clock service'
  },
  pa: {
    complaintTitleLabel: 'ਸ਼ਿਕਾਇਤ ਸਿਰਲੇਖ',
    complaintTitlePlaceholder: 'ਸਮੱਸਿਆ ਦਾ ਸੰਖੇਪ ਦੱਸੋ',
    complaintPriorityLabel: 'ਤਰਜੀਹ',
    complaintCategoryLabel: 'ਸ਼੍ਰੇਣੀ',
    complaintDepartmentLabel: 'ਵਿਭਾਗ',
    complaintDescriptionLabel: 'ਸ਼ਿਕਾਇਤ ਦਾ ਵੇਰਵਾ',
    complaintDescriptionPlaceholder: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਸ਼ਿਕਾਇਤ ਦਾ ਵੇਰਵਾ ਦਿਓ...',
    complaintAttachmentsLabel: 'ਸਹਾਇਕ ਫਾਈਲਾਂ (ਫੋਟੋ/ਆਡੀਓ/ਵੀਡੀਓ)',
    complaintSecurityLabel: 'ਸੁਰੱਖਿਆ ਪੁਸ਼ਟੀਕਰਨ',
    captchaPlaceholder: 'ਉੱਪਰ ਦਿੱਤਾ ਕੋਡ ਦਰਜ ਕਰੋ',
    serviceCards: [
      {
        title: 'ਸ਼ਿਕਾਇਤ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
        description: 'AI-powered routing system ਨਾਲ ਸਾਰੀਆਂ ਨਾਗਰਿਕ ਸ਼ਿਕਾਇਤਾਂ ਦਾ ਤੁਰੰਤ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
        bullets: ['24/7 ਉਪਲਬਧਤਾ', 'ਮੁਫਤ ਸੇਵਾ', 'ਤੁਰੰਤ ਪੁਸ਼ਟੀ', 'ਵਿਲੱਖਣ ਟ੍ਰੈਕਿੰਗ ਆਈਡੀ']
      },
      {
        title: 'ਸਥਿਤੀ ਟ੍ਰੈਕਿੰਗ',
        description: 'ਵੇਰਵੇਦਾਰ progress updates ਨਾਲ ਰੀਅਲ-ਟਾਈਮ ਸ਼ਿਕਾਇਤ ਸਥਿਤੀ ਨਿਗਰਾਨੀ',
        bullets: ['Live Status Updates', 'SMS/Email Alerts', 'Progress Timeline', 'Department Contact Info']
      },
      {
        title: 'AI ਸਹਾਇਕ',
        description: 'Smart routing ਅਤੇ automated department selection ਲਈ Artificial Intelligence',
        bullets: ['Instant Department Selection', '95% ਸਹੀਤਾ ਦਰ', 'Faster Processing', 'Voice Recognition Support']
      },
      {
        title: 'ਮੋਬਾਈਲ ਰੈਡੀ',
        description: 'Fully responsive design ਜੋ ਸਾਰੇ devices ਅਤੇ screen sizes ਤੇ ਵਧੀਆ ਕੰਮ ਕਰੇ',
        bullets: ['Mobile Responsive', 'Touch-Friendly Interface', 'Fast Loading', 'Cross-Platform Support']
      }
    ],
    statsTitle: 'ਸਿਸਟਮ ਅੰਕੜੇ',
    statsSubtitle: 'ਰੀਅਲ-ਟਾਈਮ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਪ੍ਰਗਤੀ ਟ੍ਰੈਕਿੰਗ',
    statLabels: ['ਕੁੱਲ ਸ਼ਿਕਾਇਤਾਂ', 'ਬਕਾਇਆ ਕੇਸ', 'ਸੁਲਝੀਆਂ', 'ਸਰਗਰਮ ਯੂਜ਼ਰ'],
    trackTitle: 'ਸ਼ਿਕਾਇਤ ਦੀ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ',
    trackSubtitle: 'ਆਪਣੀ ਸ਼ਿਕਾਇਤ ਦੀ ਮੌਜੂਦਾ ਸਥਿਤੀ ਅਤੇ ਤਰੱਕੀ ਵੇਖੋ',
    servicesTitle: 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ',
    aboutTitle: 'ਸਾਡੇ ਬਾਰੇ',
    teamTitle: 'ਸਾਡੀ ਟੀਮ',
    contactTitle: 'ਸੰਪਰਕ ਕਰੋ',
    contactSubtitle: 'ਮਦਦ ਅਤੇ ਸਹਾਇਤਾ ਲਈ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    complaintTitle: 'ਨਵੀਂ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
    complaintSubtitle: 'ਕਿਰਪਾ ਕਰਕੇ ਸ਼ਿਕਾਇਤ ਦੀ ਪੂਰੀ ਜਾਣਕਾਰੀ ਭਰੋ',
    complaintDetailsHeading: 'ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ',
    complaintName: 'ਤੁਹਾਡਾ ਨਾਮ',
    complaintNamePlaceholder: 'ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ',
    complaintEmail: 'ਈਮੇਲ ਪਤਾ',
    complaintEmailPlaceholder: 'ਆਪਣਾ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ',
    complaintPhone: 'ਫੋਨ ਨੰਬਰ',
    complaintPhonePlaceholder: '10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ',
    complaintState: 'ਰਾਜ',
    complaintCity: 'ਸ਼ਹਿਰ',
    complaintPincode: 'ਪਿਨ ਕੋਡ',
    complaintPincodePlaceholder: '6 ਅੰਕਾਂ ਦਾ ਪਿਨ ਕੋਡ ਦਰਜ ਕਰੋ',
    complaintArea: 'ਇਲਾਕਾ',
    complaintAreaPlaceholder: 'ਇਲਾਕਾ ਭਰੋ ਜਾਂ PIN ਨਾਲ ਆਪਣੇ ਆਪ ਭਰਿਆ ਜਾਵੇਗਾ',
    servicesSubtitle: 'ਨਾਗਰਿਕਾਂ ਲਈ AI-powered ਡਿਜ਼ਿਟਲ ਸੇਵਾਵਾਂ',
    aboutSubtitle: 'ਡਿਜ਼ਿਟਲ ਇੰਡੀਆ ਪਹਲ ਦਾ ਹਿੱਸਾ',
    aboutSections: { titles: ['𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 ਕੀ ਹੈ?', 'ਸਾਡਾ ਮਿਸ਼ਨ', 'ਤਕਨੀਕੀ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ'] },
    teamSubtitle: 'ਨਵੀਂ ਤਕਨਾਲੋਜੀ ਰਾਹੀਂ ਬਿਹਤਰ ਡਿਜ਼ਿਟਲ ਭਾਰਤ ਬਣਾਉਣ ਲਈ ਸਮਰਪਿਤ',
    teamStats: ['ਡਿਜ਼ਿਟਲ ਇੰਡੀਆ ਪਹਲ', 'ਸੇਵਾ ਉਪਲਬਧਤਾ', 'AI ਸਹੀਤਾ ਦਰ', 'ਸਹਾਇਤਿਤ ਭਾਸ਼ਾਵਾਂ'],
    teamRoles: [
      'ਸੀਨੀਅਰ ਫੁੱਲ-ਸਟੈਕ ਡਿਵੈਲਪਰ',
      'ਫਰੰਟਐਂਡ ਡਿਵੈਲਪਰ ਅਤੇ UI/UX ਡਿਜ਼ਾਈਨਰ',
      'ਬੈਕਐਂਡ ਡਿਵੈਲਪਰ ਅਤੇ ਡਾਟਾਬੇਸ ਵਿਸ਼ੇਸ਼ਗਿਆ',
      'AI/ML ਇੰਜੀਨੀਅਰ ਅਤੇ NLP ਵਿਸ਼ੇਸ਼ਗਿਆ'
    ],
    privacyTitle: 'ਗੋਪਨੀਯਤਾ ਨੀਤੀ',
    privacySubtitle: 'ਤੁਹਾਡੀ ਗੋਪਨੀਯਤਾ ਅਤੇ ਡਾਟਾ ਸੁਰੱਖਿਆ ਸਾਡੀ ਸਭ ਤੋਂ ਵੱਡੀ ਤਰਜੀਹ ਹੈ',
    stateDefault: 'ਰਾਜ ਚੁਣੋ',
    cityDefault: 'ਪਹਿਲਾਂ ਰਾਜ ਚੁਣੋ',
    phoneHelp: 'ਸਿਰਫ 10 ਅੰਕ ਦਰਜ ਕਰੋ',
    pincodeHelp: '6 ਅੰਕਾਂ ਦਾ ਪਿਨ ਕੋਡ ਦਰਜ ਕਰੋ',
    areaHelp: 'ਇਲਾਕਾ ਭਰੋ ਜਾਂ PIN ਨਾਲ ਆਪਣੇ ਆਪ ਭਰਿਆ ਜਾਵੇਗਾ',
    priorityDefault: 'ਤਰਜੀਹ ਚੁਣੋ',
    categoryDefault: 'ਸ਼੍ਰੇਣੀ ਚੁਣੋ',
    departmentDefault: 'ਵਿਭਾਗ ਚੁਣੋ',
    fileUploadText: 'ਫਾਈਲਾਂ ਇੱਥੇ ਖਿੱਚੋ ਜਾਂ ਅੱਪਲੋਡ ਕਰਨ ਲਈ ਕਲਿਕ ਕਰੋ',
    fileUploadHelp: 'ਸਮਰਥਿਤ: JPG, PNG, MP3, WAV, MP4 (ਹਰ ਫਾਈਲ ਲਈ ਵੱਧ ਤੋਂ ਵੱਧ 10MB)',
    captchaRefresh: 'ਰਿਫ੍ਰੈਸ਼',
    captchaHelp: 'ਇਨਸਾਨੀ ਜਾਂਚ ਲਈ ਉੱਪਰ ਦਿੱਤਾ ਕੋਡ ਦਰਜ ਕਰੋ',
    contactHeadquarters: 'ਮੁੱਖ ਦਫ਼ਤਰ',
    contactHelpline: 'ਹੈਲਪਲਾਈਨ',
    contactEmail: 'ਈਮੇਲ',
    contactSocial: 'ਸੋਸ਼ਲ ਮੀਡੀਆ',
    responseTime: 'ਜਵਾਬ ਸਮਾਂ',
    responseTimeText: 'ਅਸੀਂ ਕਾਰੋਬਾਰੀ ਸਮੇਂ ਵਿੱਚ 2-4 ਘੰਟਿਆਂ ਵਿੱਚ ਅਤੇ ਹਫ਼ਤੇਅੰਤ ਵਿੱਚ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਜਵਾਬ ਦਿੰਦੇ ਹਾਂ।',
    sendMessage: 'ਸੁਨੇਹਾ ਭੇਜੋ',
    contactName: 'ਤੁਹਾਡਾ ਨਾਮ *',
    contactNamePlaceholder: 'ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ',
    contactEmailLabel: 'ਈਮੇਲ ਪਤਾ *',
    contactEmailPlaceholder: 'ਆਪਣਾ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ',
    contactMobile: 'ਮੋਬਾਈਲ ਨੰਬਰ (10 ਅੰਕ)',
    contactMobilePlaceholder: '10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ',
    contactMobileHelp: 'ਸਿਰਫ 10 ਅੰਕ ਦਰਜ ਕਰੋ',
    contactSubject: 'ਵਿਸ਼ਾ *',
    contactSubjectDefault: 'ਇੱਕ ਵਿਸ਼ਾ ਚੁਣੋ *',
    contactSubjectOptions: ['ਤਕਨੀਕੀ ਸਹਾਇਤਾ', 'ਸ਼ਿਕਾਇਤ ਸੰਬੰਧੀ', 'ਫੀਡਬੈਕ ਅਤੇ ਸੁਝਾਅ', 'ਭਾਗੀਦਾਰੀ ਪੁੱਛਗਿੱਛ', 'ਹੋਰ'],
    contactMessage: 'ਤੁਹਾਡਾ ਸੁਨੇਹਾ *',
    contactMessagePlaceholder: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਸੁਨੇਹਾ ਵਿਸਥਾਰ ਨਾਲ ਲਿਖੋ...',
    sendMessageButton: 'ਸੁਨੇਹਾ ਭੇਜੋ',
    contactNote: 'ਸਾਰੇ ਸੁਨੇਹੇ ਸਾਡੀ ਟੀਮ ਦੁਆਰਾ ਵੇਖੇ ਜਾਂਦੇ ਹਨ। ਜ਼ਰੂਰੀ ਮਾਮਲਿਆਂ ਲਈ ਸੀਧੇ ਹੈਲਪਲਾਈਨ ਤੇ ਕਾਲ ਕਰੋ।',
    helplineAvailability: '(24/7 ਉਪਲਬਧ)',
    helplineSchedule: 'ਸੋਮਵਾਰ ਤੋਂ ਐਤਵਾਰ: ਚੌਵੀ ਘੰਟੇ ਸੇਵਾ'
  },
  ur: {
    statsTitle: 'سسٹم اعدادوشمار',
    statsSubtitle: 'ریئل ٹائم تجزیہ اور پیش رفت ٹریکنگ',
    statLabels: ['کل شکایات', 'زیر التوا کیس', 'حل شدہ', 'فعال صارفین'],
    trackTitle: 'شکایت کی حالت ٹریک کریں',
    trackSubtitle: 'اپنی شکایت کی موجودہ حالت اور پیش رفت دیکھیں',
    servicesTitle: 'ہماری خدمات',
    aboutTitle: 'ہمارے بارے میں',
    teamTitle: 'ہماری ٹیم',
    contactTitle: 'رابطہ کریں',
    contactSubtitle: 'مدد اور تعاون کے لیے ہم سے رابطہ کریں',
    complaintTitle: 'نئی شکایت درج کریں',
    complaintSubtitle: 'براہ کرم شکایت کی مکمل تفصیلات درج کریں',
    complaintDetailsHeading: 'آپ کی تفصیلات',
    complaintName: 'آپ کا نام',
    complaintNamePlaceholder: 'پورا نام درج کریں',
    complaintEmail: 'ای میل پتہ',
    complaintEmailPlaceholder: 'اپنا ای میل پتہ درج کریں',
    complaintPhone: 'فون نمبر',
    complaintPhonePlaceholder: '10 ہندسوں کا موبائل نمبر درج کریں',
    complaintState: 'ریاست',
    complaintCity: 'شہر',
    complaintPincode: 'پن کوڈ',
    complaintPincodePlaceholder: '6 ہندسوں کا پن کوڈ درج کریں',
    complaintArea: 'علاقہ',
    complaintAreaPlaceholder: 'علاقہ درج کریں یا PIN سے خود بخود بھر جائے گا',
    servicesSubtitle: 'شہریوں کے لیے AI-powered ڈیجیٹل خدمات',
    aboutSubtitle: 'ڈیجیٹل انڈیا اقدام کا حصہ',
    aboutSections: { titles: ['𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 کیا ہے؟', 'ہمارا مشن', 'تکنیکی خصوصیات'] },
    teamSubtitle: 'جدید ٹیکنالوجی کے ذریعے بہتر ڈیجیٹل بھارت بنانے کے لیے پرعزم',
    teamStats: ['ڈیجیٹل انڈیا اقدام', 'سروس دستیابی', 'AI درستگی کی شرح', 'معاون زبانیں'],
    teamRoles: [
      'سینئر فل اسٹیک ڈویلپر',
      'فرنٹ اینڈ ڈویلپر اور UI/UX ڈیزائنر',
      'بیک اینڈ ڈویلپر اور ڈیٹابیس ماہر',
      'AI/ML انجینئر اور NLP ماہر'
    ],
    privacyTitle: 'رازداری کی پالیسی',
    privacySubtitle: 'آپ کی رازداری اور ڈیٹا سیکیورٹی ہماری اولین ترجیح ہے',
    stateDefault: 'ریاست منتخب کریں',
    cityDefault: 'پہلے ریاست منتخب کریں',
    phoneHelp: 'صرف 10 ہندسے درج کریں',
    pincodeHelp: '6 ہندسوں کا پن کوڈ درج کریں',
    areaHelp: 'علاقہ درج کریں یا PIN سے خود بخود بھر جائے گا',
    priorityDefault: 'ترجیح منتخب کریں',
    categoryDefault: 'زمرہ منتخب کریں',
    departmentDefault: 'محکمہ منتخب کریں',
    fileUploadText: 'فائلیں یہاں گھسیٹیں یا اپ لوڈ کے لیے کلک کریں',
    fileUploadHelp: 'معاونت: JPG, PNG, MP3, WAV, MP4 (ہر فائل زیادہ سے زیادہ 10MB)',
    captchaRefresh: 'ریفریش',
    captchaHelp: 'تصدیق کے لیے اوپر دکھایا گیا کوڈ درج کریں',
    contactHeadquarters: 'ہیڈکوارٹر',
    contactHelpline: 'ہیلپ لائن',
    contactEmail: 'ای میل',
    contactSocial: 'سوشل میڈیا',
    responseTime: 'جواب کا وقت',
    responseTimeText: 'ہم کاروباری اوقات میں 2-4 گھنٹوں کے اندر اور ویک اینڈ پر 24 گھنٹوں کے اندر جواب دیتے ہیں۔',
    sendMessage: 'پیغام بھیجیں',
    contactName: 'آپ کا نام *',
    contactNamePlaceholder: 'اپنا پورا نام درج کریں',
    contactEmailLabel: 'ای میل پتہ *',
    contactEmailPlaceholder: 'اپنا ای میل پتہ درج کریں',
    contactMobile: 'موبائل نمبر (صرف 10 ہندسے)',
    contactMobilePlaceholder: '10 ہندسوں کا موبائل نمبر درج کریں',
    contactMobileHelp: 'صرف 10 ہندسے درج کریں',
    contactSubject: 'موضوع *',
    contactSubjectDefault: 'ایک موضوع منتخب کریں *',
    contactSubjectOptions: ['تکنیکی مدد', 'شکایت سے متعلق', 'رائے اور تجاویز', 'شراکت داری کی معلومات', 'دیگر'],
    contactMessage: 'آپ کا پیغام *',
    contactMessagePlaceholder: 'براہ کرم اپنا پیغام تفصیل سے لکھیں...',
    sendMessageButton: 'پیغام بھیجیں',
    contactNote: 'تمام پیغامات ہماری ٹیم کے ذریعے دیکھے جاتے ہیں۔ فوری مسائل کے لیے براہ راست ہیلپ لائن پر کال کریں۔',
    helplineAvailability: '(24/7 دستیاب)',
    helplineSchedule: 'پیر سے اتوار: چوبیس گھنٹے سروس'
  },
  ta: {
    complaintTitle: 'புதிய புகாரை பதிவு செய்யவும்',
    complaintSubtitle: 'தயவுசெய்து புகார் விவரங்களை முழுமையாக நிரப்பவும்',
    complaintDetailsHeading: 'உங்கள் விவரங்கள்',
    complaintName: 'உங்கள் பெயர்',
    complaintNamePlaceholder: 'முழு பெயரை உள்ளிடவும்',
    complaintEmail: 'மின்னஞ்சல் முகவரி',
    complaintEmailPlaceholder: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
    complaintPhone: 'தொலைபேசி எண்',
    complaintPhonePlaceholder: '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
    complaintState: 'மாநிலம்',
    complaintCity: 'நகரம்',
    complaintPincode: 'அஞ்சல் குறியீடு',
    complaintPincodePlaceholder: '6 இலக்க PIN குறியீட்டை உள்ளிடவும்',
    complaintArea: 'பகுதி',
    complaintAreaPlaceholder: 'பகுதியை உள்ளிடவும் அல்லது PIN மூலம் தானாக நிரம்பும்',
    complaintName: 'உங்கள் பெயர்',
    complaintNamePlaceholder: 'முழு பெயரை உள்ளிடவும்',
    complaintEmail: 'மின்னஞ்சல் முகவரி',
    complaintEmailPlaceholder: 'your.email@example.com',
    complaintPhone: 'தொலைபேசி எண்',
    complaintPhonePlaceholder: '+91 XXXXX XXXXX',
    complaintState: 'மாநிலம்',
    complaintCity: 'நகரம்',
    complaintPincode: 'அஞ்சல் குறியீடு',
    complaintPincodePlaceholder: '6 இலக்க PIN கோடை உள்ளிடவும்',
    complaintArea: 'பகுதி',
    complaintAreaPlaceholder: 'பகுதியை உள்ளிடவும் அல்லது PIN மூலம் தானாக நிரம்பும்',
    trackTitle: 'புகார் நிலையை கண்காணிக்கவும்',
    trackSubtitle: 'உங்கள் புகாரின் தற்போதைய நிலை மற்றும் முன்னேற்றத்தை பார்க்கவும்',
    trackLabel: 'டிராக்கிங் ஐடி உள்ளிடவும்',
    search: 'தேடுக',
    servicesTitle: 'எங்கள் சேவைகள்',
    servicesSubtitle: 'குடிமக்களுக்கான AI ஆதரவு கொண்ட டிஜிட்டல் சேவைகள்',
    serviceCards: [
      {
        title: 'புகார் பதிவு',
        description: 'AI வழிமாற்று அமைப்புடன் அனைத்து வகையான குடிமக்கள் புகார்களையும் உடனடியாக பதிவு செய்யுங்கள்',
        bullets: ['24/7 கிடைக்கும்', 'இலவச சேவை', 'உடனடி உறுதிப்படுத்தல்', 'தனிப்பட்ட டிராக்கிங் ஐடி']
      },
      {
        title: 'நிலை கண்காணிப்பு',
        description: 'விரிவான முன்னேற்ற புதுப்பிப்புகளுடன் புகார் நிலையை நேரடியாக கண்காணிக்கவும்',
        bullets: ['நேரடி நிலை புதுப்பிப்புகள்', 'SMS/மின்னஞ்சல் அறிவிப்புகள்', 'முன்னேற்ற காலவரிசை', 'துறை தொடர்பு தகவல்']
      },
      {
        title: 'AI உதவியாளர்',
        description: 'சரியான துறைக்கு புத்திசாலித்தனமான வழிமாற்று மற்றும் தானியங்கி தேர்வு',
        bullets: ['உடனடி துறை தேர்வு', '95% துல்லிய விகிதம்', 'வேகமான செயலாக்கம்', 'குரல் அங்கீகார ஆதரம்']
      },
      {
        title: 'மொபைல் தயார்',
        description: 'அனைத்து சாதனங்கள் மற்றும் திரை அளவுகளிலும் சிறப்பாக செயல்படும் responsive வடிவமைப்பு',
        bullets: ['மொபைல் Responsive', 'தொடு நட்பு இடைமுகம்', 'வேகமான ஏற்றம்', 'Cross-platform ஆதரம்']
      }
    ],
    aboutTitle: 'எங்களை பற்றி',
    aboutSubtitle: 'டிஜிட்டல் இந்தியா முயற்சியின் ஒரு பகுதி',
    aboutSections: {
      titles: ['𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 என்பது என்ன?', 'எங்கள் பணி', 'தொழில்நுட்ப அம்சங்கள்']
    },
    teamTitle: 'எங்கள் அணி',
    teamSubtitle: 'புதுமையான தொழில்நுட்ப தீர்வுகள் மூலம் சிறந்த டிஜிட்டல் இந்தியாவை உருவாக்க அர்ப்பணிப்பு',
    teamStats: ['டிஜிட்டல் இந்தியா முயற்சி', 'சேவை கிடைப்பது', 'AI துல்லிய விகிதம்', 'ஆதரிக்கப்படும் மொழிகள்'],
    teamRoles: [
      'மூத்த Full-Stack Developer',
      'Frontend Developer மற்றும் UI/UX Designer',
      'Backend Developer மற்றும் Database Specialist',
      'AI/ML Engineer மற்றும் NLP Specialist'
    ],
    privacyTitle: 'தனியுரிமைக் கொள்கை',
    privacySubtitle: 'உங்கள் தனியுரிமையும் தரவு பாதுகாப்பும் எங்கள் மிக உயர்ந்த முன்னுரிமை',
    contactHeadquarters: 'தலைமை அலுவலகம்',
    contactHelpline: 'உதவி எண்',
    contactEmail: 'மின்னஞ்சல்',
    contactSocial: 'சமூக ஊடகம்',
    responseTime: 'பதில் நேரம்',
    responseTimeText: 'சாதாரண வேலை நேரத்தில் 2-4 மணி நேரத்திற்குள் மற்றும் வார இறுதிகளில் 24 மணி நேரத்திற்குள் பதிலளிக்கிறோம்.',
    sendMessage: 'செய்தி அனுப்பவும்',
    contactName: 'உங்கள் பெயர் *',
    contactNamePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
    contactEmailLabel: 'மின்னஞ்சல் முகவரி *',
    contactEmailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்',
    contactMobile: 'மொபைல் எண் (10 இலக்கங்கள் மட்டும்)',
    contactMobilePlaceholder: '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
    contactMobileHelp: '10 இலக்கங்கள் மட்டும் உள்ளிடவும்',
    contactSubject: 'பொருள் *',
    contactSubjectDefault: 'ஒரு பொருளை தேர்வு செய்யவும் *',
    contactSubjectOptions: ['தொழில்நுட்ப ஆதரம்', 'புகார் தொடர்பானது', 'கருத்துகள் மற்றும் பரிந்துரைகள்', 'கூட்டு முயற்சி தொடர்பான கேள்வி', 'மற்றவை'],
    contactMessage: 'உங்கள் செய்தி *',
    contactMessagePlaceholder: 'உங்கள் கேள்வி அல்லது செய்தியை விரிவாக எழுதவும்...',
    sendMessageButton: 'செய்தி அனுப்பவும்',
    contactNote: 'அனைத்து செய்திகளும் எங்கள் அணியால் பரிசீலிக்கப்படுகின்றன. அவசர பிரச்சினைகளுக்கு நேரடியாக உதவி எண்ணை அழைக்கவும்.',
    helplineAvailability: '(24/7 கிடைக்கும்)',
    helplineSchedule: 'திங்கள் முதல் ஞாயிறு வரை: முழுநேர சேவை',
    stateDefault: 'மாநிலத்தை தேர்வு செய்யவும்',
    cityDefault: 'முதலில் மாநிலத்தை தேர்வு செய்யவும்',
    phoneHelp: '10 இலக்கங்களை மட்டும் உள்ளிடவும்',
    pincodeHelp: '6 இலக்க அஞ்சல் குறியீட்டை உள்ளிடவும்',
    areaHelp: 'பகுதியை உள்ளிடவும் அல்லது PIN மூலம் தானாக நிரம்பும்',
    priorityDefault: 'முன்னுரிமையை தேர்வு செய்யவும்',
    categoryDefault: 'வகையை தேர்வு செய்யவும்',
    departmentDefault: 'துறையை தேர்வு செய்யவும்',
    fileUploadText: 'கோப்புகளை இங்கு இழுக்கவும் அல்லது பதிவேற்ற கிளிக் செய்யவும்',
    fileUploadHelp: 'ஆதரவு: JPG, PNG, MP3, WAV, MP4 (ஒரு கோப்பிற்கு அதிகபட்சம் 10MB)',
    captchaRefresh: 'புதுப்பிக்கவும்',
    captchaHelp: 'நீங்கள் மனிதர் என்பதை உறுதிப்படுத்த மேலுள்ள குறியீட்டை உள்ளிடவும்',
    contactTitle: 'எங்களை தொடர்பு கொள்ளுங்கள்',
    contactSubtitle: 'உதவி மற்றும் ஆதரவிற்கு எங்களை அணுகவும்',
    sendMessage: 'செய்தி அனுப்பவும்'
  },
  te: {
    complaintTitle: 'కొత్త ఫిర్యాదును నమోదు చేయండి',
    complaintSubtitle: 'దయచేసి ఫిర్యాదు వివరాలను పూర్తిగా నమోదు చేయండి',
    complaintDetailsHeading: 'మీ వివరాలు',
    complaintName: 'మీ పేరు',
    complaintNamePlaceholder: 'పూర్తి పేరు నమోదు చేయండి',
    complaintEmail: 'ఇమెయిల్ చిరునామా',
    complaintEmailPlaceholder: 'మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి',
    complaintPhone: 'ఫోన్ నంబర్',
    complaintPhonePlaceholder: '10-అంకెల మొబైల్ నంబర్ నమోదు చేయండి',
    complaintState: 'రాష్ట్రం',
    complaintCity: 'నగరం',
    complaintPincode: 'పిన్ కోడ్',
    complaintPincodePlaceholder: '6 అంకెల పిన్ కోడ్ నమోదు చేయండి',
    complaintArea: 'ప్రాంతం',
    complaintAreaPlaceholder: 'ప్రాంతాన్ని నమోదు చేయండి లేదా PIN ద్వారా ఆటో-ఫిల్ అవుతుంది',
    complaintName: 'మీ పేరు',
    complaintNamePlaceholder: 'పూర్తి పేరు నమోదు చేయండి',
    complaintEmail: 'ఇమెయిల్ చిరునామా',
    complaintEmailPlaceholder: 'your.email@example.com',
    complaintPhone: 'ఫోన్ నంబర్',
    complaintPhonePlaceholder: '+91 XXXXX XXXXX',
    complaintState: 'రాష్ట్రం',
    complaintCity: 'నగరం',
    complaintPincode: 'పిన్ కోడ్',
    complaintPincodePlaceholder: '6 అంకెల పిన్ కోడ్ నమోదు చేయండి',
    complaintArea: 'ప్రాంతం',
    complaintAreaPlaceholder: 'ప్రాంతాన్ని నమోదు చేయండి లేదా PIN ద్వారా ఆటో-ఫిల్ అవుతుంది',
    trackTitle: 'ఫిర్యాదు స్థితిని ట్రాక్ చేయండి',
    trackSubtitle: 'మీ ఫిర్యాదు యొక్క ప్రస్తుత స్థితి మరియు పురోగతిని చూడండి',
    trackLabel: 'ట్రాకింగ్ ఐడి నమోదు చేయండి',
    search: 'శోధించండి',
    servicesTitle: 'మా సేవలు',
    servicesSubtitle: 'పౌరుల కోసం AI ఆధారిత డిజిటల్ సేవలు',
    serviceCards: [
      {
        title: 'ఫిర్యాదు నమోదు',
        description: 'AI రూటింగ్ సిస్టమ్‌తో అన్ని రకాల పౌర ఫిర్యాదుల తక్షణ నమోదు',
        bullets: ['24/7 అందుబాటులో', 'ఉచిత సేవ', 'తక్షణ నిర్ధారణ', 'ప్రత్యేక ట్రాకింగ్ ఐడి']
      },
      {
        title: 'స్థితి ట్రాకింగ్',
        description: 'వివరమైన పురోగతి నవీకరణలతో ఫిర్యాదు స్థితిని రియల్ టైమ్‌లో చూడండి',
        bullets: ['లైవ్ స్థితి నవీకరణలు', 'SMS/ఇమెయిల్ అలర్ట్స్', 'పురోగతి టైమ్‌లైన్', 'శాఖ సంప్రదింపు వివరాలు']
      },
      {
        title: 'AI సహాయకుడు',
        description: 'స్మార్ట్ రూటింగ్ మరియు ఆటోమేటెడ్ శాఖ ఎంపిక కోసం Artificial Intelligence',
        bullets: ['తక్షణ శాఖ ఎంపిక', '95% ఖచ్చితత్వం', 'వేగవంతమైన ప్రాసెసింగ్', 'వాయిస్ గుర్తింపు మద్దతు']
      },
      {
        title: 'మొబైల్ రెడీ',
        description: 'అన్ని పరికరాలు మరియు స్క్రీన్ పరిమాణాల్లో అద్భుతంగా పనిచేసే responsive design',
        bullets: ['మొబైల్ Responsive', 'టచ్ ఫ్రెండ్లీ ఇంటర్‌ఫేస్', 'ఫాస్ట్ లోడింగ్', 'క్రాస్ ప్లాట్‌ఫారమ్ మద్దతు']
      }
    ],
    aboutTitle: 'మా గురించి',
    aboutSubtitle: 'డిజిటల్ ఇండియా ప్రారంభంలో భాగం',
    aboutSections: {
      titles: ['𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 అంటే ఏమిటి?', 'మా లక్ష్యం', 'సాంకేతిక లక్షణాలు']
    },
    teamTitle: 'మా బృందం',
    teamSubtitle: 'నవీన సాంకేతిక పరిష్కారాల ద్వారా మెరుగైన డిజిటల్ ఇండియాను నిర్మించడానికి అంకితం',
    teamStats: ['డిజిటల్ ఇండియా ప్రారంభం', 'సేవ అందుబాటు', 'AI ఖచ్చితత్వం', 'మద్దతు ఉన్న భాషలు'],
    teamRoles: [
      'సీనియర్ ఫుల్-స్టాక్ డెవలపర్',
      'ఫ్రంట్ెండ్ డెవలపర్ & UI/UX డిజైనర్',
      'బ్యాక్ెండ్ డెవలపర్ & డేటాబేస్ స్పెషలిస్ట్',
      'AI/ML ఇంజనీర్ & NLP స్పెషలిస్ట్'
    ],
    privacyTitle: 'గోప్యతా విధానం',
    privacySubtitle: 'మీ గోప్యత మరియు డేటా భద్రత మా అత్యున్నత ప్రాధాన్యత',
    contactHeadquarters: 'ప్రధాన కార్యాలయం',
    contactHelpline: 'హెల్ప్‌లైన్',
    contactEmail: 'ఇమెయిల్',
    contactSocial: 'సోషల్ మీడియా',
    responseTime: 'ప్రతిస్పందన సమయం',
    responseTimeText: 'వ్యాపార సమయాల్లో 2-4 గంటలలోపు మరియు వారాంతాల్లో 24 గంటలలోపు మేము స్పందిస్తాము.',
    sendMessage: 'సందేశం పంపండి',
    contactName: 'మీ పేరు *',
    contactNamePlaceholder: 'మీ పూర్తి పేరును నమోదు చేయండి',
    contactEmailLabel: 'ఇమెయిల్ చిరునామా *',
    contactEmailPlaceholder: 'మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి',
    contactMobile: 'మొబైల్ నంబర్ (10 అంకెలు మాత్రమే)',
    contactMobilePlaceholder: '10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి',
    contactMobileHelp: '10 అంకెలు మాత్రమే నమోదు చేయండి',
    contactSubject: 'విషయం *',
    contactSubjectDefault: 'ఒక విషయం ఎంచుకోండి *',
    contactSubjectOptions: ['సాంకేతిక సహాయం', 'ఫిర్యాదు సంబంధిత', 'ఫీడ్‌బ్యాక్ & సూచనలు', 'భాగస్వామ్య విచారణ', 'ఇతర'],
    contactMessage: 'మీ సందేశం *',
    contactMessagePlaceholder: 'దయచేసి మీ సందేశాన్ని వివరంగా నమోదు చేయండి...',
    sendMessageButton: 'సందేశం పంపండి',
    contactNote: 'అన్ని సందేశాలను మా బృందం పరిశీలిస్తుంది. అత్యవసర సమస్యల కోసం నేరుగా హెల్ప్‌లైన్‌కు కాల్ చేయండి.',
    helplineAvailability: '(24/7 అందుబాటులో)',
    helplineSchedule: 'సోమవారం నుండి ఆదివారం వరకు: రౌండ్-ది-క్లాక్ సేవ',
    stateDefault: 'రాష్ట్రాన్ని ఎంచుకోండి',
    cityDefault: 'ముందు రాష్ట్రాన్ని ఎంచుకోండి',
    phoneHelp: 'కేవలం 10 అంకెలను నమోదు చేయండి',
    pincodeHelp: '6 అంకెల పిన్ కోడ్ నమోదు చేయండి',
    areaHelp: 'ప్రాంతాన్ని నమోదు చేయండి లేదా PIN ద్వారా ఆటో-ఫిల్ అవుతుంది',
    priorityDefault: 'ప్రాధాన్యతను ఎంచుకోండి',
    categoryDefault: 'వర్గాన్ని ఎంచుకోండి',
    departmentDefault: 'శాఖను ఎంచుకోండి',
    fileUploadText: 'ఫైళ్ళను ఇక్కడికి డ్రాగ్ చేయండి లేదా అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి',
    fileUploadHelp: 'మద్దతు: JPG, PNG, MP3, WAV, MP4 (ప్రతి ఫైల్ గరిష్ఠం 10MB)',
    captchaRefresh: 'రీఫ్రెష్',
    captchaHelp: 'మీరు మనిషి అని ధృవీకరించడానికి పై కోడ్‌ను నమోదు చేయండి',
    contactTitle: 'మమ్మల్ని సంప్రదించండి',
    contactSubtitle: 'సహాయం మరియు మద్దతు కోసం మమ్మల్ని సంప్రదించండి',
    sendMessage: 'సందేశం పంపండి'
  },
  mr: {
    complaintTitle: 'नवीन तक्रार नोंदवा',
    complaintSubtitle: 'कृपया तक्रारीची सविस्तर माहिती भरा',
    complaintDetailsHeading: 'तुमची माहिती',
    trackTitle: 'तक्रार स्थिती ट्रॅक करा',
    trackSubtitle: 'तुमच्या तक्रारीची सद्यस्थिती आणि प्रगती पाहा',
    trackLabel: 'ट्रॅकिंग आयडी टाका',
    search: 'शोधा',
    stateDefault: 'राज्य निवडा',
    cityDefault: 'प्रथम राज्य निवडा',
    phoneHelp: 'फक्त 10 अंक टाका',
    pincodeHelp: '6 अंकी पिन कोड टाका',
    areaHelp: 'क्षेत्र भरा किंवा PIN वरून आपोआप भरेल',
    priorityDefault: 'प्राधान्य निवडा',
    categoryDefault: 'वर्ग निवडा',
    departmentDefault: 'विभाग निवडा',
    fileUploadText: 'फाईल्स येथे ओढा किंवा अपलोड करण्यासाठी क्लिक करा',
    fileUploadHelp: 'समर्थित: JPG, PNG, MP3, WAV, MP4 (प्रति फाईल कमाल 10MB)',
    captchaRefresh: 'रिफ्रेश',
    captchaHelp: 'मानवी पडताळणीसाठी वरील कोड टाका',
    contactTitle: 'संपर्क करा',
    contactSubtitle: 'मदत आणि सहाय्यासाठी आमच्याशी संपर्क साधा',
    sendMessage: 'संदेश पाठवा'
  },
  gu: {
    complaintTitle: 'નવી ફરિયાદ નોંધાવો',
    complaintSubtitle: 'કૃપા કરીને ફરિયાદની વિગતવાર માહિતી ભરો',
    complaintDetailsHeading: 'તમારી વિગતો',
    trackTitle: 'ફરિયાદની સ્થિતિ ટ્રેક કરો',
    trackSubtitle: 'તમારી ફરિયાદની હાલની સ્થિતિ અને પ્રગતિ જુઓ',
    trackLabel: 'ટ્રેકિંગ આઈડી દાખલ કરો',
    search: 'શોધો',
    stateDefault: 'રાજ્ય પસંદ કરો',
    cityDefault: 'પહેલાં રાજ્ય પસંદ કરો',
    phoneHelp: 'માત્ર 10 અંક દાખલ કરો',
    pincodeHelp: '6 અંકનો PIN કોડ દાખલ કરો',
    areaHelp: 'વિસ્તાર દાખલ કરો અથવા PIN થી આપમેળે ભરાશે',
    priorityDefault: 'પ્રાથમિકતા પસંદ કરો',
    categoryDefault: 'કેટેગરી પસંદ કરો',
    departmentDefault: 'વિભાગ પસંદ કરો',
    fileUploadText: 'ફાઇલો અહીં ખેંચો અથવા અપલોડ કરવા ક્લિક કરો',
    fileUploadHelp: 'સમર્થિત: JPG, PNG, MP3, WAV, MP4 (પ્રતિ ફાઇલ મહત્તમ 10MB)',
    captchaRefresh: 'રિફ્રેશ',
    captchaHelp: 'તમે માનવી છો તેની ચકાસણી માટે ઉપરનો કોડ દાખલ કરો',
    contactTitle: 'અમારો સંપર્ક કરો',
    contactSubtitle: 'મદદ અને સહાય માટે અમારો સંપર્ક કરો',
    sendMessage: 'સંદેશ મોકલો'
  },
  kn: {
    complaintTitle: 'ಹೊಸ ದೂರು ದಾಖಲಿಸಿ',
    complaintSubtitle: 'ದಯವಿಟ್ಟು ದೂರುದ ವಿವರಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಭರ್ತಿ ಮಾಡಿ',
    complaintDetailsHeading: 'ನಿಮ್ಮ ವಿವರಗಳು',
    trackTitle: 'ದೂರು ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    trackSubtitle: 'ನಿಮ್ಮ ದೂರುದ ಇಂದಿನ ಸ್ಥಿತಿ ಮತ್ತು ಪ್ರಗತಿಯನ್ನು ನೋಡಿ',
    trackLabel: 'ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ ನಮೂದಿಸಿ',
    search: 'ಹುಡುಕಿ',
    stateDefault: 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    cityDefault: 'ಮೊದಲು ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    phoneHelp: '10 ಅಂಕೆಗಳಷ್ಟೇ ನಮೂದಿಸಿ',
    pincodeHelp: '6 ಅಂಕೆಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ',
    areaHelp: 'ಪ್ರದೇಶವನ್ನು ನಮೂದಿಸಿ ಅಥವಾ PIN ನಿಂದ ಸ್ವಯಂ ತುಂಬಲಾಗುತ್ತದೆ',
    priorityDefault: 'ಆದ್ಯತೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    categoryDefault: 'ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    departmentDefault: 'ವಿಭಾಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    fileUploadText: 'ಫೈಲ್‌ಗಳನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಬಿಡಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    fileUploadHelp: 'ಬೆಂಬಲಿತ: JPG, PNG, MP3, WAV, MP4 (ಪ್ರತಿ ಫೈಲ್ ಗರಿಷ್ಠ 10MB)',
    captchaRefresh: 'ರಿಫ್ರೆಶ್',
    captchaHelp: 'ನೀವು ಮಾನವರೆಂದು ಪರಿಶೀಲಿಸಲು ಮೇಲಿನ ಕೋಡ್ ನಮೂದಿಸಿ',
    contactTitle: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    contactSubtitle: 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲಕ್ಕಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    sendMessage: 'ಸಂದೇಶ ಕಳುಹಿಸಿ'
  },
  ml: {
    complaintTitle: 'പുതിയ പരാതി രജിസ്റ്റർ ചെയ്യുക',
    complaintSubtitle: 'ദയവായി പരാതിയുടെ വിശദാംശങ്ങൾ പൂരിപ്പിക്കുക',
    complaintDetailsHeading: 'നിങ്ങളുടെ വിവരങ്ങൾ',
    trackTitle: 'പരാതിയുടെ നില പരിശോധിക്കുക',
    trackSubtitle: 'നിങ്ങളുടെ പരാതിയുടെ ഇപ്പോഴത്തെ നിലയും പുരോഗതിയും പരിശോധിക്കുക',
    trackLabel: 'ട്രാക്കിംഗ് ഐഡി നൽകുക',
    search: 'തിരയുക',
    stateDefault: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
    cityDefault: 'ആദ്യം സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
    phoneHelp: '10 അക്കങ്ങൾ മാത്രം നൽകുക',
    pincodeHelp: '6 അക്ക പിൻ കോഡ് നൽകുക',
    areaHelp: 'പ്രദേശം നൽകുക അല്ലെങ്കിൽ PIN വഴി സ്വയം പൂരിപ്പിക്കും',
    priorityDefault: 'പ്രാധാന്യം തിരഞ്ഞെടുക്കുക',
    categoryDefault: 'വിഭാഗം തിരഞ്ഞെടുക്കുക',
    departmentDefault: 'വകുപ്പ് തിരഞ്ഞെടുക്കുക',
    fileUploadText: 'ഫയലുകൾ ഇവിടെ വലിച്ചിടുക അല്ലെങ്കിൽ അപ്‌ലോഡ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക',
    fileUploadHelp: 'പിന്തുണ: JPG, PNG, MP3, WAV, MP4 (ഓരോ ഫയലിനും പരമാവധി 10MB)',
    captchaRefresh: 'റിഫ്രെഷ്',
    captchaHelp: 'നിങ്ങൾ മനുഷ്യനാണെന്ന് സ്ഥിരീകരിക്കാൻ മുകളിൽ കാണുന്ന കോഡ് നൽകുക',
    contactTitle: 'ഞങ്ങളെ ബന്ധപ്പെടുക',
    contactSubtitle: 'സഹായത്തിനും പിന്തുണയ്ക്കുമായി ഞങ്ങളെ സമീപിക്കുക',
    sendMessage: 'സന്ദേശം അയയ്ക്കുക'
  },
  bn: {
    complaintTitle: 'নতুন অভিযোগ দাখিল করুন',
    complaintSubtitle: 'অনুগ্রহ করে অভিযোগের বিস্তারিত তথ্য পূরণ করুন',
    complaintDetailsHeading: 'আপনার বিবরণ',
    trackTitle: 'অভিযোগের অবস্থা ট্র্যাক করুন',
    trackSubtitle: 'আপনার অভিযোগের বর্তমান অবস্থা এবং অগ্রগতি দেখুন',
    trackLabel: 'ট্র্যাকিং আইডি লিখুন',
    search: 'অনুসন্ধান',
    stateDefault: 'রাজ্য নির্বাচন করুন',
    cityDefault: 'আগে রাজ্য নির্বাচন করুন',
    phoneHelp: 'শুধু 10 অঙ্ক লিখুন',
    pincodeHelp: '6 অঙ্কের পিন কোড লিখুন',
    areaHelp: 'এলাকা লিখুন অথবা PIN থেকে অটো-ফিল হবে',
    priorityDefault: 'অগ্রাধিকার নির্বাচন করুন',
    categoryDefault: 'বিভাগ নির্বাচন করুন',
    departmentDefault: 'দপ্তর নির্বাচন করুন',
    fileUploadText: 'ফাইল এখানে টানুন বা আপলোড করতে ক্লিক করুন',
    fileUploadHelp: 'সমর্থিত: JPG, PNG, MP3, WAV, MP4 (প্রতি ফাইল সর্বোচ্চ 10MB)',
    captchaRefresh: 'রিফ্রেশ',
    captchaHelp: 'আপনি মানুষ কিনা যাচাই করতে উপরের কোড লিখুন',
    contactTitle: 'যোগাযোগ করুন',
    contactSubtitle: 'সহায়তা ও সমর্থনের জন্য আমাদের সাথে যোগাযোগ করুন',
    sendMessage: 'বার্তা পাঠান'
  },
  pa: {
    complaintTitle: 'ਨਵੀਂ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
    complaintSubtitle: 'ਕਿਰਪਾ ਕਰਕੇ ਸ਼ਿਕਾਇਤ ਦੀ ਪੂਰੀ ਜਾਣਕਾਰੀ ਭਰੋ',
    complaintDetailsHeading: 'ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ',
    trackTitle: 'ਸ਼ਿਕਾਇਤ ਦੀ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ',
    trackSubtitle: 'ਆਪਣੀ ਸ਼ਿਕਾਇਤ ਦੀ ਮੌਜੂਦਾ ਸਥਿਤੀ ਅਤੇ ਤਰੱਕੀ ਵੇਖੋ',
    trackLabel: 'ਟ੍ਰੈਕਿੰਗ ਆਈਡੀ ਦਰਜ ਕਰੋ',
    search: 'ਖੋਜੋ',
    stateDefault: 'ਰਾਜ ਚੁਣੋ',
    cityDefault: 'ਪਹਿਲਾਂ ਰਾਜ ਚੁਣੋ',
    phoneHelp: 'ਸਿਰਫ 10 ਅੰਕ ਦਰਜ ਕਰੋ',
    pincodeHelp: '6 ਅੰਕਾਂ ਦਾ ਪਿੰਨ ਕੋਡ ਦਰਜ ਕਰੋ',
    areaHelp: 'ਇਲਾਕਾ ਭਰੋ ਜਾਂ PIN ਨਾਲ ਆਪਣੇ ਆਪ ਭਰਿਆ ਜਾਵੇਗਾ',
    priorityDefault: 'ਤਰਜੀਹ ਚੁਣੋ',
    categoryDefault: 'ਸ਼੍ਰੇਣੀ ਚੁਣੋ',
    departmentDefault: 'ਵਿਭਾਗ ਚੁਣੋ',
    fileUploadText: 'ਫਾਈਲਾਂ ਇੱਥੇ ਖਿੱਚੋ ਜਾਂ ਅੱਪਲੋਡ ਕਰਨ ਲਈ ਕਲਿਕ ਕਰੋ',
    fileUploadHelp: 'ਸਮਰਥਿਤ: JPG, PNG, MP3, WAV, MP4 (ਹਰ ਫਾਈਲ ਲਈ ਵੱਧ ਤੋਂ ਵੱਧ 10MB)',
    captchaRefresh: 'ਰਿਫ੍ਰੈਸ਼',
    captchaHelp: 'ਇਨਸਾਨੀ ਜਾਂਚ ਲਈ ਉੱਪਰ ਦਿੱਤਾ ਕੋਡ ਦਰਜ ਕਰੋ',
    contactTitle: 'ਸੰਪਰਕ ਕਰੋ',
    contactSubtitle: 'ਮਦਦ ਅਤੇ ਸਹਾਇਤਾ ਲਈ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    sendMessage: 'ਸੁਨੇਹਾ ਭੇਜੋ'
  },
  or: {
    complaintTitle: 'ନୂତନ ଅଭିଯୋଗ ଦାଖଲ କରନ୍ତୁ',
    complaintSubtitle: 'ଦୟାକରି ଅଭିଯୋଗର ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ ଭରନ୍ତୁ',
    complaintDetailsHeading: 'ଆପଣଙ୍କ ବିବରଣୀ',
    trackTitle: 'ଅଭିଯୋଗ ସ୍ଥିତି ଟ୍ରାକ କରନ୍ତୁ',
    trackSubtitle: 'ଆପଣଙ୍କ ଅଭିଯୋଗର ବର୍ତ୍ତମାନ ସ୍ଥିତି ଏବଂ ପ୍ରଗତି ଦେଖନ୍ତୁ',
    trackLabel: 'ଟ୍ରାକିଂ ଆଇଡି ଲେଖନ୍ତୁ',
    search: 'ଖୋଜନ୍ତୁ',
    stateDefault: 'ରାଜ୍ୟ ବାଛନ୍ତୁ',
    cityDefault: 'ପ୍ରଥମେ ରାଜ୍ୟ ବାଛନ୍ତୁ',
    phoneHelp: 'କେବଳ 10ଟି ଅଙ୍କ ଲେଖନ୍ତୁ',
    pincodeHelp: '6 ଅଙ୍କର PIN କୋଡ୍ ଲେଖନ୍ତୁ',
    areaHelp: 'ଅଞ୍ଚଳ ଲେଖନ୍ତୁ କିମ୍ବା PIN ରୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଭରିବ',
    priorityDefault: 'ପ୍ରାଥମିକତା ବାଛନ୍ତୁ',
    categoryDefault: 'ଶ୍ରେଣୀ ବାଛନ୍ତୁ',
    departmentDefault: 'ବିଭାଗ ବାଛନ୍ତୁ',
    fileUploadText: 'ଫାଇଲଗୁଡିକୁ ଏଠାରେ ଟାଣନ୍ତୁ କିମ୍ବା ଅପଲୋଡ୍ ପାଇଁ କ୍ଲିକ୍ କରନ୍ତୁ',
    fileUploadHelp: 'ସମର୍ଥିତ: JPG, PNG, MP3, WAV, MP4 (ପ୍ରତି ଫାଇଲ୍ ସର୍ବାଧିକ 10MB)',
    captchaRefresh: 'ରିଫ୍ରେଶ',
    captchaHelp: 'ଆପଣ ମଣିଷ ଥିବାକୁ ଯାଞ୍ଚ ପାଇଁ ଉପରୋକ୍ତ କୋଡ୍ ଲେଖନ୍ତୁ',
    contactTitle: 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
    contactSubtitle: 'ସହାୟତା ଓ ସମର୍ଥନ ପାଇଁ ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ',
    sendMessage: 'ସନ୍ଦେଶ ପଠାନ୍ତୁ'
  },
  as: {
    complaintTitle: 'নতুন অভিযোগ দাখিল কৰক',
    complaintSubtitle: 'অনুগ্ৰহ কৰি অভিযোগৰ বিস্তৃত তথ্য পূৰণ কৰক',
    complaintDetailsHeading: 'আপোনাৰ তথ্য',
    trackTitle: 'অভিযোগৰ অৱস্থা ট্ৰেক কৰক',
    trackSubtitle: 'আপোনাৰ অভিযোগৰ বৰ্তমান অৱস্থা আৰু অগ্ৰগতি চাওক',
    trackLabel: 'ট্ৰেকিং আইডি লিখক',
    search: 'সন্ধান কৰক',
    stateDefault: 'ৰাজ্য বাছক',
    cityDefault: 'আগতে ৰাজ্য বাছক',
    phoneHelp: 'কেৱল 10টা সংখ্যা লিখক',
    pincodeHelp: '6 সংখ্যাৰ PIN কোড লিখক',
    areaHelp: "এলাকা লিখক অথবা PIN ৰ পৰা স্বয়ংক্রিয়ভাৱে পূৰণ হ'ব",
    priorityDefault: 'অগ্ৰাধিকাৰ বাছক',
    categoryDefault: 'শ্ৰেণী বাছক',
    departmentDefault: 'বিভাগ বাছক',
    fileUploadText: 'ফাইল ইয়াত টানি আনক বা আপলোড কৰিবলৈ ক্লিক কৰক',
    fileUploadHelp: 'সমৰ্থিত: JPG, PNG, MP3, WAV, MP4 (প্ৰতি ফাইল সৰ্বাধিক 10MB)',
    captchaRefresh: 'ৰিফ্ৰেশ',
    captchaHelp: 'আপুনি মানুহ বুলি যাচাই কৰিবলৈ ওপৰৰ কোড লিখক',
    contactTitle: 'যোগাযোগ কৰক',
    contactSubtitle: 'সহায় আৰু সমৰ্থনৰ বাবে আমাৰ সৈতে যোগাযোগ কৰক',
    sendMessage: 'বাৰ্তা পঠাওক'
  },
  ur: {
    complaintTitle: 'نئی شکایت درج کریں',
    complaintSubtitle: 'براہ کرم شکایت کی مکمل تفصیلات درج کریں',
    complaintDetailsHeading: 'آپ کی تفصیلات',
    trackTitle: 'شکایت کی حالت ٹریک کریں',
    trackSubtitle: 'اپنی شکایت کی موجودہ حالت اور پیش رفت دیکھیں',
    trackLabel: 'ٹریکنگ آئی ڈی درج کریں',
    search: 'تلاش کریں',
    stateDefault: 'ریاست منتخب کریں',
    cityDefault: 'پہلے ریاست منتخب کریں',
    phoneHelp: 'صرف 10 ہندسے درج کریں',
    pincodeHelp: '6 ہندسوں کا پن کوڈ درج کریں',
    areaHelp: 'علاقہ درج کریں یا PIN سے خود بخود بھر جائے گا',
    priorityDefault: 'ترجیح منتخب کریں',
    categoryDefault: 'زمرہ منتخب کریں',
    departmentDefault: 'محکمہ منتخب کریں',
    fileUploadText: 'فائلیں یہاں گھسیٹیں یا اپ لوڈ کے لیے کلک کریں',
    fileUploadHelp: 'معاونت: JPG, PNG, MP3, WAV, MP4 (ہر فائل زیادہ سے زیادہ 10MB)',
    captchaRefresh: 'ریفریش',
    captchaHelp: 'تصدیق کے لیے اوپر دکھایا گیا کوڈ درج کریں',
    contactTitle: 'رابطہ کریں',
    contactSubtitle: 'مدد اور تعاون کے لیے ہم سے رابطہ کریں',
    sendMessage: 'پیغام بھیجیں'
  },
  ne: {
    complaintTitle: 'नयाँ उजुरी दर्ता गर्नुहोस्',
    complaintSubtitle: 'कृपया उजुरीको विस्तृत जानकारी भर्नुहोस्',
    complaintDetailsHeading: 'तपाईंको विवरण',
    trackTitle: 'उजुरीको स्थिति ट्र्याक गर्नुहोस्',
    trackSubtitle: 'तपाईंको उजुरीको हालको स्थिति र प्रगति हेर्नुहोस्',
    trackLabel: 'ट्र्याकिङ आईडी लेख्नुहोस्',
    search: 'खोज्नुहोस्',
    stateDefault: 'राज्य छान्नुहोस्',
    cityDefault: 'पहिले राज्य छान्नुहोस्',
    phoneHelp: 'केवल 10 अंक लेख्नुहोस्',
    pincodeHelp: '6 अङ्कको पिन कोड लेख्नुहोस्',
    areaHelp: 'क्षेत्र लेख्नुहोस् वा PIN बाट स्वतः भरिनेछ',
    priorityDefault: 'प्राथमिकता छान्नुहोस्',
    categoryDefault: 'श्रेणी छान्नुहोस्',
    departmentDefault: 'विभाग छान्नुहोस्',
    fileUploadText: 'फाइल यहाँ तान्नुहोस् वा अपलोड गर्न क्लिक गर्नुहोस्',
    fileUploadHelp: 'समर्थित: JPG, PNG, MP3, WAV, MP4 (प्रति फाइल अधिकतम 10MB)',
    captchaRefresh: 'रिफ्रेस',
    captchaHelp: 'तपाईं मानव हुनुहुन्छ भनेर प्रमाणित गर्न माथिको कोड लेख्नुहोस्',
    contactTitle: 'सम्पर्क गर्नुहोस्',
    contactSubtitle: 'सहायता र समर्थनका लागि हामीलाई सम्पर्क गर्नुहोस्',
    sendMessage: 'सन्देश पठाउनुहोस्'
  }
};

const homePageLocalized = {
  en: {
    aiDemoTitle: 'AI Demo - See How It Works',
    aiDemoSubtitle: 'Experience how our AI understands and routes your complaints automatically',
    aiDemoPrompt: 'Try AI Demo - Click to Test:',
    aiDemoButtons: ["Test: 'Road Potholes'", "Test: 'Power Issues'", "Test: 'Water Problems'"],
    featuresTitle: 'Key Features',
    featureCards: [
      {
        title: 'AI-Powered Smart Routing',
        description: 'Advanced artificial intelligence automatically routes complaints to the correct department with intelligent keyword analysis',
        bullets: ['95% Accurate Routing', 'Confidence Scoring', '50+ Keyword Mapping']
      },
      {
        title: 'Multimedia Evidence Support',
        description: 'Upload photos, audio recordings, and videos to strengthen your complaint with solid evidence',
        bullets: ['Drag & Drop Upload', 'Real-time Preview', '10MB per File Limit']
      },
      {
        title: 'Real-time Status Tracking',
        description: 'Monitor your complaint status in real-time with detailed progress updates and instant notifications',
        bullets: ['Live Status Updates', 'SMS/Email Alerts', 'Progress Timeline']
      },
      {
        title: 'Multilingual Interface',
        description: 'Complete multilingual support with seamless language switching capabilities',
        bullets: ['Language Selector', 'One-Click Toggle', 'Context Preservation']
      }
    ]
  },
  hi: {
    aiDemoTitle: 'AI डेमो - देखें यह कैसे काम करता है',
    aiDemoSubtitle: 'अनुभव करें कि हमारा AI आपकी शिकायत को कैसे समझता और अपने आप रूट करता है',
    aiDemoPrompt: 'AI डेमो आज़माएँ - क्लिक करें:',
    aiDemoButtons: ["टेस्ट: 'सड़क गड्ढे'", "टेस्ट: 'बिजली समस्या'", "टेस्ट: 'पानी समस्या'"],
    featuresTitle: 'मुख्य विशेषताएँ',
    featureCards: [
      {
        title: 'AI-संचालित स्मार्ट रूटिंग',
        description: 'उन्नत आर्टिफिशियल इंटेलिजेंस शिकायतों को सही विभाग तक स्वतः पहुँचाती है',
        bullets: ['95% सही रूटिंग', 'कॉन्फिडेंस स्कोरिंग', '50+ कीवर्ड मैपिंग']
      },
      {
        title: 'मल्टीमीडिया एविडेंस सपोर्ट',
        description: 'फोटो, ऑडियो और वीडियो अपलोड करके अपनी शिकायत को मजबूत बनाएं',
        bullets: ['Drag & Drop Upload', 'रियल-टाइम प्रीव्यू', 'प्रति फाइल 10MB सीमा']
      },
      {
        title: 'रियल-टाइम स्टेटस ट्रैकिंग',
        description: 'विस्तृत प्रगति अपडेट और इंस्टेंट नोटिफिकेशन के साथ शिकायत स्थिति देखें',
        bullets: ['Live Status Updates', 'SMS/Email Alerts', 'प्रगति टाइमलाइन']
      },
      {
        title: 'बहुभाषी इंटरफेस',
        description: 'सीमलेस भाषा परिवर्तन के साथ पूरी मल्टीलिंगुअल सपोर्ट',
        bullets: ['Language Selector', 'One-Click Toggle', 'Context Preservation']
      }
    ]
  },
  hinglish: {
    aiDemoTitle: 'AI Demo - Dekho kaise kaam karta hai',
    aiDemoSubtitle: 'Experience karo kaise AI aapki complaint ko samajhkar automatically route karta hai',
    aiDemoPrompt: 'AI Demo try karo - click karo:',
    aiDemoButtons: ["Test: 'Road Potholes'", "Test: 'Power Issues'", "Test: 'Water Problems'"],
    featuresTitle: 'Key Features',
    featureCards: [
      {
        title: 'AI-Powered Smart Routing',
        description: 'Advanced AI complaints ko intelligent keyword analysis ke basis par sahi department tak route karta hai',
        bullets: ['95% Accurate Routing', 'Confidence Scoring', '50+ Keyword Mapping']
      },
      {
        title: 'Multimedia Evidence Support',
        description: 'Photos, audio aur videos upload karke complaint ko strong evidence ke saath bhejo',
        bullets: ['Drag & Drop Upload', 'Real-time Preview', '10MB per File Limit']
      },
      {
        title: 'Real-time Status Tracking',
        description: 'Detailed progress updates aur instant notifications ke saath complaint status monitor karo',
        bullets: ['Live Status Updates', 'SMS/Email Alerts', 'Progress Timeline']
      },
      {
        title: 'Multilingual Interface',
        description: 'Seamless language switching ke saath full multilingual support',
        bullets: ['Language Selector', 'One-Click Toggle', 'Context Preservation']
      }
    ]
  },
  pa: {
    aiDemoTitle: 'AI ਡੈਮੋ - ਵੇਖੋ ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',
    aiDemoSubtitle: 'ਵੇਖੋ ਸਾਡਾ AI ਤੁਹਾਡੀ ਸ਼ਿਕਾਇਤ ਨੂੰ ਕਿਵੇਂ ਸਮਝਦਾ ਅਤੇ ਆਪਣੇ ਆਪ route ਕਰਦਾ ਹੈ',
    aiDemoPrompt: 'AI ਡੈਮੋ ਅਜ਼ਮਾਓ - ਕਲਿਕ ਕਰੋ:',
    aiDemoButtons: ["ਟੈਸਟ: 'ਸੜਕ ਦੇ ਖੱਡੇ'", "ਟੈਸਟ: 'ਬਿਜਲੀ ਸਮੱਸਿਆ'", "ਟੈਸਟ: 'ਪਾਣੀ ਦੀ ਸਮੱਸਿਆ'"],
    featuresTitle: 'ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    featureCards: [
      {
        title: 'AI-Powered Smart Routing',
        description: 'ਤਕਨੀਕੀ AI ਸ਼ਿਕਾਇਤ ਨੂੰ ਸਹੀ ਵਿਭਾਗ ਤੱਕ ਆਪਣੇ ਆਪ ਪਹੁੰਚਾਉਂਦਾ ਹੈ',
        bullets: ['95% Accurate Routing', 'Confidence Scoring', '50+ Keyword Mapping']
      },
      {
        title: 'Multimedia Evidence Support',
        description: 'ਫੋਟੋ, ਆਡੀਓ ਅਤੇ ਵੀਡੀਓ ਅਪਲੋਡ ਕਰਕੇ ਸ਼ਿਕਾਇਤ ਨੂੰ ਮਜ਼ਬੂਤ ਸਬੂਤ ਨਾਲ ਭੇਜੋ',
        bullets: ['Drag & Drop Upload', 'Real-time Preview', '10MB per File Limit']
      },
      {
        title: 'Real-time Status Tracking',
        description: 'ਵੇਰਵੇਦਾਰ updates ਅਤੇ instant notifications ਨਾਲ ਸ਼ਿਕਾਇਤ ਦੀ ਸਥਿਤੀ ਵੇਖੋ',
        bullets: ['Live Status Updates', 'SMS/Email Alerts', 'Progress Timeline']
      },
      {
        title: 'Multilingual Interface',
        description: 'ਸਹਿਜ language switching ਨਾਲ ਪੂਰੀ multilingual support',
        bullets: ['Language Selector', 'One-Click Toggle', 'Context Preservation']
      }
    ]
  },
  ta: {
    aiDemoTitle: 'AI டெமோ - இது எப்படி செயல்படுகிறது என்பதை பாருங்கள்',
    aiDemoSubtitle: 'எங்கள் AI உங்கள் புகாரை எப்படி புரிந்து தானாக வழிமாற்றுகிறது என்பதை காணுங்கள்',
    aiDemoPrompt: 'AI டெமோவை முயற்சிக்க கிளிக் செய்யவும்:',
    aiDemoButtons: ["சோதனை: 'சாலை குழிகள்'", "சோதனை: 'மின்சார பிரச்சனை'", "சோதனை: 'தண்ணீர் பிரச்சனை'"],
    featuresTitle: 'முக்கிய அம்சங்கள்',
    featureCards: [
      {
        title: 'AI ஆதரவு கொண்ட Smart Routing',
        description: 'மேம்பட்ட AI உங்கள் புகாரை சரியான துறைக்கு தானாக அனுப்புகிறது',
        bullets: ['95% துல்லியமான Routing', 'Confidence Scoring', '50+ Keyword Mapping']
      },
      {
        title: 'Multimedia Evidence Support',
        description: 'புகைப்படங்கள், ஒலி மற்றும் வீடியோக்களை பதிவேற்றி புகாரை வலுப்படுத்துங்கள்',
        bullets: ['Drag & Drop Upload', 'Real-time Preview', 'ஒவ்வொரு கோப்புக்கும் 10MB வரம்பு']
      },
      {
        title: 'Real-time Status Tracking',
        description: 'விரிவான முன்னேற்ற புதுப்பிப்புகளுடன் புகார் நிலையை நேரடியாக கண்காணிக்கவும்',
        bullets: ['Live Status Updates', 'SMS/Email Alerts', 'Progress Timeline']
      },
      {
        title: 'Multilingual Interface',
        description: 'மொழியை எளிதாக மாற்றும் முழுமையான ஆதரவு',
        bullets: ['Language Selector', 'One-Click Toggle', 'Context Preservation']
      }
    ]
  },
  te: {
    aiDemoTitle: 'AI డెమో - ఇది ఎలా పనిచేస్తుందో చూడండి',
    aiDemoSubtitle: 'మా AI మీ ఫిర్యాదును ఎలా అర్థం చేసుకుని ఆటోమేటిక్‌గా రూట్ చేస్తుందో చూడండి',
    aiDemoPrompt: 'AI డెమో ప్రయత్నించండి - క్లిక్ చేయండి:',
    aiDemoButtons: ["టెస్ట్: 'రోడ్ గుంతలు'", "టెస్ట్: 'పవర్ ఇష్యూస్'", "టెస్ట్: 'వాటర్ ప్రాబ్లమ్స్'"],
    featuresTitle: 'ముఖ్య లక్షణాలు',
    featureCards: [
      {
        title: 'AI-Powered Smart Routing',
        description: 'అధునాతన AI ఫిర్యాదులను సరైన శాఖకు ఆటోమేటిక్‌గా పంపిస్తుంది',
        bullets: ['95% Accurate Routing', 'Confidence Scoring', '50+ Keyword Mapping']
      },
      {
        title: 'Multimedia Evidence Support',
        description: 'ఫోటోలు, ఆడియో మరియు వీడియోలను అప్‌లోడ్ చేసి ఫిర్యాదును బలపరచండి',
        bullets: ['Drag & Drop Upload', 'Real-time Preview', 'ప్రతి ఫైల్‌కు 10MB పరిమితి']
      },
      {
        title: 'Real-time Status Tracking',
        description: 'వివరమైన పురోగతి నవీకరణలతో ఫిర్యాదు స్థితిని ట్రాక్ చేయండి',
        bullets: ['Live Status Updates', 'SMS/Email Alerts', 'Progress Timeline']
      },
      {
        title: 'Multilingual Interface',
        description: 'సులభమైన language switching తో పూర్తి multilingual support',
        bullets: ['Language Selector', 'One-Click Toggle', 'Context Preservation']
      }
    ]
  }
};

const extendedSectionLocalized = {
  en: {
    aboutParagraphs: [
      '𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 is the official citizen complaint management system of the Government of India. It is part of the Digital India initiative and helps citizens reach government departments efficiently. Our platform leverages modern technology to ensure transparent, accountable, and swift resolution of civic issues.'
    ],
    aboutMission: [
      'Transparent and accountable governance system',
      "Amplifying citizens' voices to government",
      'Fast and effective solutions',
      'Digital empowerment for all'
    ],
    aboutFeatures: [
      'Secure data encryption and privacy protection',
      'Multilingual support across Indian languages',
      'Mobile-friendly responsive design',
      'AI-powered smart complaint routing',
      'Voice-to-text input support',
      'Real-time analytics and reporting'
    ],
    teamLeadBadge: 'PROJECT LEAD',
    teamBios: [
      'Leading the development of 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 with expertise in AI integration, full-stack development, and project management.',
      'Specialized in creating beautiful, responsive user interfaces and enhancing user experience across all devices.',
      'Expert in server-side development, database management, and API integration for seamless backend operations.',
      'Focused on implementing AI-powered routing, natural language processing, and machine learning algorithms.'
    ],
    teamConnectTitle: 'Connect With Our Team',
    teamConnectButtons: ['GitHub Profile', 'LinkedIn Profile', 'Email Team'],
    privacyHeaders: ['Information We Collect', 'How We Use Your Data', 'Data Security Measures', 'Your Rights', 'Contact Privacy Officer'],
    privacyOfficerText: 'For any privacy-related queries, contact us at:',
    footerQuickLinks: 'Quick Links',
    footerQuickLinkItems: ['Home', 'File Complaint', 'Track Status', 'Our Team', 'Services', 'Contact Us'],
    footerGovLinks: 'Government Links',
    footerCopyright: '© 2026 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 - Government of India. All Rights Reserved.',
    footerLastUpdated: 'Last Updated:'
  },
  hi: {
    aboutParagraphs: [
      '𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 भारत सरकार की आधिकारिक नागरिक शिकायत प्रबंधन प्रणाली है। यह डिजिटल इंडिया पहल का हिस्सा है और नागरिकों को सरकारी विभागों तक प्रभावी रूप से पहुँचने में मदद करती है। हमारा प्लेटफॉर्म पारदर्शी, जवाबदेह और तेज समाधान सुनिश्चित करने के लिए आधुनिक तकनीक का उपयोग करता है।'
    ],
    aboutMission: [
      'पारदर्शी और जवाबदेह शासन प्रणाली',
      'नागरिकों की आवाज़ को सरकार तक पहुँचाना',
      'तेज़ और प्रभावी समाधान',
      'सभी के लिए डिजिटल सशक्तिकरण'
    ],
    aboutFeatures: [
      'सुरक्षित डेटा एन्क्रिप्शन और गोपनीयता सुरक्षा',
      'भारतीय भाषाओं में बहुभाषी समर्थन',
      'मोबाइल-फ्रेंडली responsive design',
      'AI-संचालित स्मार्ट शिकायत रूटिंग',
      'वॉइस-टू-टेक्स्ट इनपुट सपोर्ट',
      'रीयल-टाइम एनालिटिक्स और रिपोर्टिंग'
    ],
    teamLeadBadge: 'प्रोजेक्ट लीड',
    teamBios: [
      'AI integration, full-stack development और project management की विशेषज्ञता के साथ 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 के development का नेतृत्व कर रहे हैं।',
      'सुंदर, responsive user interfaces बनाने और सभी devices पर user experience बेहतर करने में विशेषज्ञ।',
      'server-side development, database management और API integration में विशेषज्ञ।',
      'AI-powered routing, natural language processing और machine learning algorithms पर केंद्रित।'
    ],
    teamConnectTitle: 'हमारी टीम से जुड़ें',
    teamConnectButtons: ['GitHub प्रोफाइल', 'LinkedIn प्रोफाइल', 'टीम को ईमेल'],
    privacyHeaders: ['हम कौन सी जानकारी एकत्र करते हैं', 'हम आपके डेटा का उपयोग कैसे करते हैं', 'डेटा सुरक्षा उपाय', 'आपके अधिकार', 'गोपनीयता अधिकारी से संपर्क करें'],
    privacyOfficerText: 'गोपनीयता से संबंधित किसी भी प्रश्न के लिए हमसे संपर्क करें:',
    footerQuickLinks: 'त्वरित लिंक',
    footerQuickLinkItems: ['होम', 'शिकायत दर्ज करें', 'स्थिति ट्रैक करें', 'हमारी टीम', 'सेवाएँ', 'संपर्क करें'],
    footerGovLinks: 'सरकारी लिंक',
    footerCopyright: '© 2026 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 - भारत सरकार। सर्वाधिकार सुरक्षित।',
    footerLastUpdated: 'अंतिम अपडेट:'
  },
  hinglish: {
    aboutParagraphs: [
      '𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 Government of India ka official citizen complaint management system hai. Ye Digital India initiative ka part hai aur citizens ko government departments tak efficiently pahunchne me help karta hai.'
    ],
    aboutMission: [
      'Transparent aur accountable governance system',
      "Citizens ki voice ko government tak pahunchana",
      'Fast aur effective solutions',
      'Sabke liye digital empowerment'
    ],
    aboutFeatures: [
      'Secure data encryption aur privacy protection',
      'Indian languages me multilingual support',
      'Mobile-friendly responsive design',
      'AI-powered smart complaint routing',
      'Voice-to-text input support',
      'Real-time analytics aur reporting'
    ],
    teamLeadBadge: 'PROJECT LEAD',
    teamBios: [
      'AI integration, full-stack development aur project management expertise ke saath 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 development ko lead kar rahe hain.',
      'Beautiful aur responsive user interfaces banane aur user experience improve karne me specialized.',
      'Server-side development, database management aur API integration me expert.',
      'AI-powered routing, natural language processing aur machine learning algorithms par focused.'
    ],
    teamConnectTitle: 'Hamari Team se Connect Karein',
    teamConnectButtons: ['GitHub Profile', 'LinkedIn Profile', 'Email Team'],
    privacyHeaders: ['Hum kya information collect karte hain', 'Hum aapke data ka use kaise karte hain', 'Data security measures', 'Aapke rights', 'Privacy officer se contact'],
    privacyOfficerText: 'Privacy related queries ke liye humse contact karein:',
    footerQuickLinks: 'Quick Links',
    footerQuickLinkItems: ['Home', 'File Complaint', 'Track Status', 'Our Team', 'Services', 'Contact Us'],
    footerGovLinks: 'Government Links',
    footerCopyright: '© 2026 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 - Government of India. All Rights Reserved.',
    footerLastUpdated: 'Last Updated:'
  },
  pa: {
    aboutParagraphs: [
      '𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 ਭਾਰਤ ਸਰਕਾਰ ਦੀ ਅਧਿਕਾਰਕ ਨਾਗਰਿਕ ਸ਼ਿਕਾਇਤ ਪ੍ਰਬੰਧਨ ਪ੍ਰਣਾਲੀ ਹੈ। ਇਹ ਡਿਜ਼ਿਟਲ ਇੰਡੀਆ ਪਹਲ ਦਾ ਹਿੱਸਾ ਹੈ ਅਤੇ ਨਾਗਰਿਕਾਂ ਨੂੰ ਸਰਕਾਰੀ ਵਿਭਾਗਾਂ ਤੱਕ ਅਸਾਨੀ ਨਾਲ ਪਹੁੰਚਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ।'
    ],
    aboutMission: [
      'ਪਾਰਦਰਸ਼ੀ ਅਤੇ ਜਵਾਬਦੇਹ ਸ਼ਾਸਨ ਪ੍ਰਣਾਲੀ',
      'ਨਾਗਰਿਕਾਂ ਦੀ ਆਵਾਜ਼ ਨੂੰ ਸਰਕਾਰ ਤੱਕ ਪਹੁੰਚਾਉਣਾ',
      'ਤੇਜ਼ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਹੱਲ',
      'ਹਰੇਕ ਲਈ ਡਿਜ਼ਿਟਲ ਸਸ਼ਕਤੀਕਰਨ'
    ],
    aboutFeatures: [
      'ਸੁਰੱਖਿਅਤ ਡਾਟਾ ਇਨਕ੍ਰਿਪਸ਼ਨ ਅਤੇ ਗੋਪਨੀਯਤਾ ਸੁਰੱਖਿਆ',
      'ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਬਹੁਭਾਸ਼ੀ ਸਹਾਇਤਾ',
      'ਮੋਬਾਈਲ-ਫ੍ਰੈਂਡਲੀ responsive design',
      'AI-powered smart complaint routing',
      'Voice-to-text input support',
      'ਰੀਅਲ-ਟਾਈਮ analytics ਅਤੇ reporting'
    ],
    teamLeadBadge: 'ਪ੍ਰੋਜੈਕਟ ਲੀਡ',
    teamBios: [
      'AI integration, full-stack development ਅਤੇ project management ਦੇ ਤਜਰਬੇ ਨਾਲ 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 ਦੇ ਵਿਕਾਸ ਦੀ ਅਗਵਾਈ ਕਰ ਰਹੇ ਹਨ।',
      'ਸੁੰਦਰ ਅਤੇ responsive user interfaces ਬਣਾਉਣ ਵਿੱਚ ਮਾਹਰ।',
      'server-side development, database management ਅਤੇ API integration ਵਿੱਚ ਮਾਹਰ।',
      'AI routing, natural language processing ਅਤੇ machine learning algorithms ਉੱਤੇ ਧਿਆਨ ਕੇਂਦਰਿਤ।'
    ],
    teamConnectTitle: 'ਸਾਡੀ ਟੀਮ ਨਾਲ ਜੁੜੋ',
    teamConnectButtons: ['GitHub ਪ੍ਰੋਫਾਈਲ', 'LinkedIn ਪ੍ਰੋਫਾਈਲ', 'ਟੀਮ ਨੂੰ ਈਮੇਲ'],
    privacyHeaders: ['ਅਸੀਂ ਕੀ ਜਾਣਕਾਰੀ ਇਕੱਠੀ ਕਰਦੇ ਹਾਂ', 'ਅਸੀਂ ਤੁਹਾਡੇ ਡਾਟਾ ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰਦੇ ਹਾਂ', 'ਡਾਟਾ ਸੁਰੱਖਿਆ ਕਦਮ', 'ਤੁਹਾਡੇ ਅਧਿਕਾਰ', 'Privacy Officer ਨਾਲ ਸੰਪਰਕ ਕਰੋ'],
    privacyOfficerText: 'Privacy ਸੰਬੰਧੀ ਸਵਾਲਾਂ ਲਈ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ:',
    footerQuickLinks: 'ਤੁਰੰਤ ਲਿੰਕ',
    footerQuickLinkItems: ['ਹੋਮ', 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ', 'ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ', 'ਸਾਡੀ ਟੀਮ', 'ਸੇਵਾਵਾਂ', 'ਸੰਪਰਕ ਕਰੋ'],
    footerGovLinks: 'ਸਰਕਾਰੀ ਲਿੰਕ',
    footerGovLinkItems: ['ਭਾਰਤ ਸਰਕਾਰ', 'ਡਿਜ਼ਿਟਲ ਇੰਡੀਆ', 'MyGov ਪੋਰਟਲ', 'CPGRAMS', 'PMO ਇੰਡੀਆ', 'ਮੇਕ ਇਨ ਇੰਡੀਆ'],
    footerCopyright: '© 2026 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 - ਭਾਰਤ ਸਰਕਾਰ। ਸਭ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।',
    footerLastUpdated: 'ਆਖਰੀ ਅਪਡੇਟ:'
  },
  ur: {
    aboutParagraphs: [
      '𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 حکومت ہند کا سرکاری شہری شکایت مینجمنٹ سسٹم ہے۔ یہ ڈیجیٹل انڈیا اقدام کا حصہ ہے اور شہریوں کو سرکاری محکموں تک مؤثر طریقے سے پہنچنے میں مدد دیتا ہے۔'
    ],
    aboutMission: [
      'شفاف اور جوابدہ نظام حکومت',
      'شہریوں کی آواز حکومت تک پہنچانا',
      'تیز اور مؤثر حل',
      'سب کے لیے ڈیجیٹل بااختیاری'
    ],
    aboutFeatures: [
      'محفوظ ڈیٹا انکرپشن اور رازداری کا تحفظ',
      'بھارتی زبانوں میں کثیر لسانی مدد',
      'موبائل-فرینڈلی responsive design',
      'AI-powered smart complaint routing',
      'Voice-to-text input support',
      'ریئل ٹائم analytics اور reporting'
    ],
    teamLeadBadge: 'پروجیکٹ لیڈ',
    teamBios: [
      'AI integration, full-stack development اور project management کے تجربے کے ساتھ 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 کی ترقی کی قیادت کر رہے ہیں۔',
      'خوبصورت اور responsive user interfaces بنانے میں ماہر۔',
      'server-side development, database management اور API integration میں ماہر۔',
      'AI routing, natural language processing اور machine learning algorithms پر توجہ مرکوز۔'
    ],
    teamConnectTitle: 'ہماری ٹیم سے جڑیں',
    teamConnectButtons: ['GitHub پروفائل', 'LinkedIn پروفائل', 'ٹیم کو ای میل'],
    privacyHeaders: ['ہم کون سی معلومات جمع کرتے ہیں', 'ہم آپ کے ڈیٹا کو کیسے استعمال کرتے ہیں', 'ڈیٹا سیکیورٹی اقدامات', 'آپ کے حقوق', 'Privacy Officer سے رابطہ کریں'],
    privacyOfficerText: 'Privacy سے متعلق سوالات کے لیے ہم سے رابطہ کریں:',
    footerQuickLinks: 'فوری لنکس',
    footerQuickLinkItems: ['ہوم', 'شکایت درج کریں', 'حالت ٹریک کریں', 'ہماری ٹیم', 'خدمات', 'رابطہ کریں'],
    footerGovLinks: 'سرکاری لنکس',
    footerGovLinkItems: ['حکومت ہند', 'ڈیجیٹل انڈیا', 'MyGov پورٹل', 'CPGRAMS', 'PMO انڈیا', 'میک اِن انڈیا'],
    footerCopyright: '© 2026 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 - حکومت ہند۔ جملہ حقوق محفوظ ہیں۔',
    footerLastUpdated: 'آخری اپڈیٹ:'
  },
  ta: {
    aboutParagraphs: [
      '𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 இந்திய அரசின் அதிகாரப்பூர்வ குடிமக்கள் புகார் மேலாண்மை அமைப்பு ஆகும். இது டிஜிட்டல் இந்தியா முயற்சியின் ஒரு பகுதியாகும்.'
    ],
    aboutMission: [
      'வெளிப்படையான மற்றும் பொறுப்பான நிர்வாகம்',
      'குடிமக்களின் குரலை அரசிடம் கொண்டு சேர்த்தல்',
      'வேகமான மற்றும் பயனுள்ள தீர்வுகள்',
      'அனைவருக்கும் டிஜிட்டல் அதிகாரமளித்தல்'
    ],
    aboutFeatures: [
      'பாதுகாப்பான தரவு குறியாக்கம் மற்றும் தனியுரிமை பாதுகாப்பு',
      'இந்திய மொழிகளுக்கான பல்மொழி ஆதரவு',
      'மொபைல்-friendly responsive வடிவமைப்பு',
      'AI ஆதரவு கொண்ட புகார் வழிமாற்று',
      'Voice-to-text ஆதரவு',
      'Real-time analytics மற்றும் reporting'
    ],
    teamLeadBadge: 'திட்ட முன்னணி',
    teamBios: [
      'AI integration, full-stack development மற்றும் project management அனுபவத்துடன் 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 வளர்ச்சியை முன்னிலை வகிக்கிறார்.',
      'அழகான responsive user interfaces உருவாக்குவதில் நிபுணர்.',
      'server-side development, database management மற்றும் API integration இல் நிபுணர்.',
      'AI routing, natural language processing மற்றும் machine learning மீது கவனம் செலுத்துகிறார்.'
    ],
    teamConnectTitle: 'எங்கள் அணியுடன் இணைக',
    teamConnectButtons: ['GitHub சுயவிவரம்', 'LinkedIn சுயவிவரம்', 'அணிக்கு மின்னஞ்சல்'],
    privacyHeaders: ['நாங்கள் சேகரிக்கும் தகவல்கள்', 'உங்கள் தரவை எவ்வாறு பயன்படுத்துகிறோம்', 'தரவு பாதுகாப்பு நடவடிக்கைகள்', 'உங்கள் உரிமைகள்', 'தனியுரிமை அதிகாரியை தொடர்புகொள்ளுங்கள்'],
    privacyOfficerText: 'தனியுரிமை தொடர்பான கேள்விகளுக்கு எங்களை தொடர்புகொள்ளவும்:',
    footerQuickLinks: 'விரைவு இணைப்புகள்',
    footerQuickLinkItems: ['முகப்பு', 'புகார் பதிவு', 'நிலை கண்காணிப்பு', 'எங்கள் அணி', 'சேவைகள்', 'தொடர்பு'],
    footerGovLinks: 'அரசு இணைப்புகள்',
    footerGovLinkItems: ['இந்திய அரசு', 'டிஜிட்டல் இந்தியா', 'MyGov போர்டல்', 'CPGRAMS', 'PMO இந்தியா', 'மேக் இன் இந்தியா'],
    footerCopyright: '© 2026 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 - இந்திய அரசு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    footerLastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது:'
  },
  te: {
    aboutParagraphs: [
      '𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 భారత ప్రభుత్వ అధికారిక పౌర ఫిర్యాదు నిర్వహణ వ్యవస్థ. ఇది డిజిటల్ ఇండియా ప్రారంభంలో భాగం.'
    ],
    aboutMission: [
      'పారదర్శక మరియు బాధ్యతాయుత పాలన',
      'పౌరుల స్వరాన్ని ప్రభుత్వానికి చేరవేయడం',
      'వేగవంతమైన మరియు ప్రభావవంతమైన పరిష్కారాలు',
      'అందరికీ డిజిటల్ సాధికారత'
    ],
    aboutFeatures: [
      'సురక్షిత డేటా ఎన్‌క్రిప్షన్ మరియు గోప్యతా రక్షణ',
      'భారతీయ భాషలలో multilingual support',
      'మొబైల్-friendly responsive design',
      'AI-powered smart complaint routing',
      'Voice-to-text input support',
      'Real-time analytics మరియు reporting'
    ],
    teamLeadBadge: 'ప్రాజెక్ట్ లీడ్',
    teamBios: [
      'AI integration, full-stack development మరియు project management నైపుణ్యంతో 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 అభివృద్ధిని నడిపిస్తున్నారు.',
      'సుందరమైన responsive user interfaces తయారీలో నిపుణుడు.',
      'server-side development, database management మరియు API integration లో నిపుణుడు.',
      'AI routing, natural language processing మరియు machine learning పై దృష్టి.'
    ],
    teamConnectTitle: 'మా బృందంతో కనెక్ట్ అవ్వండి',
    teamConnectButtons: ['GitHub ప్రొఫైల్', 'LinkedIn ప్రొఫైల్', 'టీమ్‌కు ఇమెయిల్'],
    privacyHeaders: ['మేము సేకరించే సమాచారం', 'మీ డేటాను ఎలా ఉపయోగిస్తాము', 'డేటా భద్రతా చర్యలు', 'మీ హక్కులు', 'Privacy Officer‌ను సంప్రదించండి'],
    privacyOfficerText: 'Privacy సంబంధిత ప్రశ్నల కోసం మమ్మల్ని సంప్రదించండి:',
    footerQuickLinks: 'త్వరిత లింకులు',
    footerQuickLinkItems: ['హోమ్', 'ఫిర్యాదు నమోదు', 'స్థితి ట్రాక్', 'మా బృందం', 'సేవలు', 'సంప్రదించండి'],
    footerGovLinks: 'ప్రభుత్వ లింకులు',
    footerGovLinkItems: ['భారత ప్రభుత్వం', 'డిజిటల్ ఇండియా', 'MyGov పోర్టల్', 'CPGRAMS', 'PMO ఇండియా', 'మేక్ ఇన్ ఇండియా'],
    footerCopyright: '© 2026 𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊 - భారత ప్రభుత్వం. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    footerLastUpdated: 'చివరి నవీకరణ:'
  }
};

const citizenAuthLocalized = {
  en: {
    loginTitle: 'USER LOGIN',
    languageLabel: 'Select preferred Language:',
    languageOptions: ['English', 'Hindi'],
    loginIdentifierLabel: 'Mobile No/Email Id/Username',
    loginIdentifierPlaceholder: 'Mobile No/Email Id/Username',
    loginPasswordLabel: 'Password',
    loginPasswordPlaceholder: 'Password',
    securityCodeLabel: 'Security code',
    securityCodePlaceholder: 'Security code',
    loginButton: 'Login',
    forgotPassword: 'Forgot Password',
    forgotUsername: 'Forgot Username',
    signUp: 'Click here to sign up',
    loginWithOtp: 'Login with OTP',
    otpLoginTitle: 'LOGIN WITH OTP',
    registeredMobile: 'Registered Mobile Number',
    mobilePlaceholder: '10 digit mobile number',
    sendOtp: 'Send OTP',
    otpLabel: 'OTP',
    otpPlaceholder: 'Enter 6 digit OTP',
    otpHelp: 'OTP will be sent to your registered mobile number.',
    backToLogin: 'Back To Login',
    verifyLogin: 'Verify & Login',
    forgotUsernameTitle: 'FORGOT USERNAME',
    recoverUsername: 'Recover Username',
    forgotPasswordTitle: 'RESET PASSWORD',
    newPassword: 'New Password',
    newPasswordPlaceholder: 'Enter new password',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm new password',
    resetPassword: 'Reset Password',
    signupBar: 'Registration/Sign up Form',
    signupHeading: 'Enter Details',
    mandatoryHtml: 'Fields marked with <span class="portal-required">*</span> are mandatory',
    name: 'Name',
    address: 'Address',
    addressPlaceholder: 'Premise Number or Name',
    locality: 'Locality',
    localityPlaceholder: 'Locality',
    state: 'State',
    stateDefault: '--Select a state--',
    stateFirstDefault: '---Select a state first---',
    districtDefault: '---Select district---',
    pincode: 'Pincode',
    phone: 'Phone number',
    phonePlaceholder: 'Phone number with STD code',
    username: 'Username',
    usernamePlaceholder: 'Choose username',
    aadhaar: 'Aadhaar Number',
    aadhaarPlaceholder: '12 digit Aadhaar number',
    aadhaarHelp: 'Aadhaar number will be used in encrypted/masked form.',
    password: 'Password',
    createPasswordPlaceholder: 'Create password',
    gender: 'Gender',
    genderOptions: ['Male', 'Female', 'Transgender'],
    subLocality: 'Sub-locality',
    subLocalityPlaceholder: 'Sub-locality',
    country: 'Country',
    district: 'District',
    mobileNumber: 'Mobile number',
    email: 'E-mail address',
    signupSecurityCode: 'Security Code',
    createAccount: 'Create Account',
    verifiedCitizen: 'Verified Citizen',
    loginSuccessful: 'Login successful',
    loggedInSubtitle: 'Now you can submit your complaint.',
    statusBackToLogin: 'Back To Login',
    summaryLabels: ['Name', 'Username', 'Mobile', 'Email', 'Aadhaar', 'State', 'District']
  },
  hi: {
    loginTitle: 'यूज़र लॉगिन',
    languageLabel: 'पसंदीदा भाषा चुनें:',
    languageOptions: ['English', 'हिंदी'],
    loginIdentifierLabel: 'मोबाइल नंबर/ईमेल आईडी/यूज़रनेम',
    loginIdentifierPlaceholder: 'मोबाइल नंबर/ईमेल आईडी/यूज़रनेम',
    loginPasswordLabel: 'पासवर्ड',
    loginPasswordPlaceholder: 'पासवर्ड',
    securityCodeLabel: 'सिक्योरिटी कोड',
    securityCodePlaceholder: 'सिक्योरिटी कोड',
    loginButton: 'लॉगिन',
    forgotPassword: 'पासवर्ड भूल गए',
    forgotUsername: 'यूज़रनेम भूल गए',
    signUp: 'यहाँ क्लिक करके साइन अप करें',
    loginWithOtp: 'OTP से लॉगिन करें',
    otpLoginTitle: 'OTP से लॉगिन',
    registeredMobile: 'रजिस्टर्ड मोबाइल नंबर',
    mobilePlaceholder: '10 अंकों का मोबाइल नंबर',
    sendOtp: 'OTP भेजें',
    otpLabel: 'OTP',
    otpPlaceholder: '6 अंकों का OTP दर्ज करें',
    otpHelp: 'OTP आपके रजिस्टर्ड मोबाइल नंबर पर भेजा जाएगा।',
    backToLogin: 'लॉगिन पर वापस जाएँ',
    verifyLogin: 'वेरिफाई करके लॉगिन करें',
    forgotUsernameTitle: 'यूज़रनेम रिकवर करें',
    recoverUsername: 'यूज़रनेम प्राप्त करें',
    forgotPasswordTitle: 'पासवर्ड रीसेट करें',
    newPassword: 'नया पासवर्ड',
    newPasswordPlaceholder: 'नया पासवर्ड दर्ज करें',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    confirmPasswordPlaceholder: 'नया पासवर्ड दोबारा दर्ज करें',
    resetPassword: 'पासवर्ड रीसेट करें',
    signupBar: 'रजिस्ट्रेशन/साइन अप फॉर्म',
    signupHeading: 'विवरण भरें',
    mandatoryHtml: 'जिन फ़ील्ड्स पर <span class="portal-required">*</span> लगा है वे अनिवार्य हैं',
    name: 'नाम',
    address: 'पता',
    addressPlaceholder: 'मकान/प्रिमाइज़ नंबर या नाम',
    locality: 'लोकैलिटी',
    localityPlaceholder: 'लोकैलिटी',
    state: 'राज्य',
    stateDefault: '--राज्य चुनें--',
    stateFirstDefault: '---पहले राज्य चुनें---',
    districtDefault: '---जिला चुनें---',
    pincode: 'पिनकोड',
    phone: 'फोन नंबर',
    phonePlaceholder: 'STD कोड सहित फोन नंबर',
    username: 'यूज़रनेम',
    usernamePlaceholder: 'यूज़रनेम चुनें',
    aadhaar: 'आधार नंबर',
    aadhaarPlaceholder: '12 अंकों का आधार नंबर',
    aadhaarHelp: 'आधार नंबर एन्क्रिप्टेड/मास्क्ड रूप में उपयोग होगा।',
    password: 'पासवर्ड',
    createPasswordPlaceholder: 'पासवर्ड बनाएँ',
    gender: 'लिंग',
    genderOptions: ['पुरुष', 'महिला', 'ट्रांसजेंडर'],
    subLocality: 'सब-लोकैलिटी',
    subLocalityPlaceholder: 'सब-लोकैलिटी',
    country: 'देश',
    district: 'जिला',
    mobileNumber: 'मोबाइल नंबर',
    email: 'ई-मेल पता',
    signupSecurityCode: 'सिक्योरिटी कोड',
    createAccount: 'अकाउंट बनाएँ',
    verifiedCitizen: 'सत्यापित नागरिक',
    loginSuccessful: 'लॉगिन सफल',
    loggedInSubtitle: 'अब आप शिकायत दर्ज कर सकते हैं।',
    statusBackToLogin: 'लॉगिन पर वापस जाएँ',
    summaryLabels: ['नाम', 'यूज़रनेम', 'मोबाइल', 'ईमेल', 'आधार', 'राज्य', 'जिला']
  }
};

function getPageCopy(langCode) {
  return { ...pageTranslations.en, ...(pageTranslations[langCode] || {}) };
}

function getCitizenAuthCopy(langCode) {
  return { ...citizenAuthLocalized.en, ...(citizenAuthLocalized[langCode] || {}) };
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element && text) {
    element.textContent = text;
  }
}

function setPlaceholder(selector, text) {
  const element = document.querySelector(selector);
  if (element && text) {
    element.placeholder = text;
  }
}

function setHtml(selector, html) {
  const element = document.querySelector(selector);
  if (element && html) {
    element.innerHTML = html;
  }
}

function setLabelByFor(fieldId, text, required = false) {
  const label = document.querySelector(`label[for="${fieldId}"]`);
  if (!label || !text) return;

  if (required) {
    label.innerHTML = `${text} <span class="portal-required">*</span>`;
  } else {
    label.textContent = text;
  }
}

function setButtonText(selector, text, withArrow = false) {
  const element = document.querySelector(selector);
  if (!element || !text) return;

  element.innerHTML = withArrow ? `${text} <span aria-hidden="true">&#10140;</span>` : text;
}

function setInputPlaceholderById(fieldId, text) {
  const element = document.getElementById(fieldId);
  if (element && text) {
    element.placeholder = text;
  }
}

function setSelectFirstOption(selectId, text) {
  const select = document.getElementById(selectId);
  if (select && select.options[0] && text) {
    select.options[0].textContent = text;
  }
}

function applyCitizenAuthTranslations(langCode) {
  const copy = getCitizenAuthCopy(langCode);

  setText('#citizen-login-section .portal-login-title', copy.loginTitle);
  setLabelByFor('citizen-login-language', copy.languageLabel);
  const loginLanguage = document.getElementById('citizen-login-language');
  if (loginLanguage && loginLanguage.options.length >= 2) {
    loginLanguage.options[0].textContent = copy.languageOptions[0];
    loginLanguage.options[1].textContent = copy.languageOptions[1];
  }
  setLabelByFor('citizen-login-identifier', copy.loginIdentifierLabel);
  setInputPlaceholderById('citizen-login-identifier', copy.loginIdentifierPlaceholder);
  setLabelByFor('citizen-login-password', copy.loginPasswordLabel);
  setInputPlaceholderById('citizen-login-password', copy.loginPasswordPlaceholder);
  setLabelByFor('citizen-login-captcha-input', copy.securityCodeLabel);
  setInputPlaceholderById('citizen-login-captcha-input', copy.securityCodePlaceholder);
  setButtonText('#citizen-login-section .portal-login-btn', copy.loginButton, true);

  const loginLinks = document.querySelectorAll('#citizen-login-section .portal-link-grid .portal-text-link');
  if (loginLinks[0]) loginLinks[0].textContent = copy.forgotPassword;
  if (loginLinks[1]) loginLinks[1].textContent = copy.forgotUsername;
  if (loginLinks[2]) loginLinks[2].textContent = copy.signUp;
  if (loginLinks[3]) loginLinks[3].textContent = copy.loginWithOtp;

  setText('#citizen-otp-login-section .portal-login-title', copy.otpLoginTitle);
  setLabelByFor('citizen-otp-login-mobile', copy.registeredMobile);
  setInputPlaceholderById('citizen-otp-login-mobile', copy.mobilePlaceholder);
  setButtonText('#citizen-otp-login-section .portal-outline-btn', copy.sendOtp);
  setLabelByFor('citizen-otp-login-code', copy.otpLabel);
  setInputPlaceholderById('citizen-otp-login-code', copy.otpPlaceholder);
  setText('#citizen-otp-login-section .auth-help', copy.otpHelp);
  const otpActionButtons = document.querySelectorAll('#citizen-otp-login-section .portal-action-row:last-of-type button');
  if (otpActionButtons[0]) otpActionButtons[0].textContent = copy.backToLogin;
  if (otpActionButtons[1]) otpActionButtons[1].textContent = copy.verifyLogin;

  setText('#citizen-forgot-username-section .portal-login-title', copy.forgotUsernameTitle);
  setLabelByFor('citizen-forgot-username-mobile', copy.registeredMobile);
  setInputPlaceholderById('citizen-forgot-username-mobile', copy.mobilePlaceholder);
  setButtonText('#citizen-forgot-username-section .portal-action-row:first-of-type .portal-outline-btn', copy.sendOtp);
  setLabelByFor('citizen-forgot-username-code', copy.otpLabel);
  setInputPlaceholderById('citizen-forgot-username-code', copy.otpPlaceholder);
  const forgotUsernameButtons = document.querySelectorAll('#citizen-forgot-username-section .portal-action-row:last-of-type button');
  if (forgotUsernameButtons[0]) forgotUsernameButtons[0].textContent = copy.backToLogin;
  if (forgotUsernameButtons[1]) forgotUsernameButtons[1].textContent = copy.recoverUsername;

  setText('#citizen-forgot-password-section .portal-login-title', copy.forgotPasswordTitle);
  setLabelByFor('citizen-forgot-password-mobile', copy.registeredMobile);
  setInputPlaceholderById('citizen-forgot-password-mobile', copy.mobilePlaceholder);
  setButtonText('#citizen-forgot-password-section .portal-action-row:first-of-type .portal-outline-btn', copy.sendOtp);
  setLabelByFor('citizen-forgot-password-code', copy.otpLabel);
  setInputPlaceholderById('citizen-forgot-password-code', copy.otpPlaceholder);
  setLabelByFor('citizen-forgot-password-new', copy.newPassword);
  setInputPlaceholderById('citizen-forgot-password-new', copy.newPasswordPlaceholder);
  setLabelByFor('citizen-forgot-password-confirm', copy.confirmPassword);
  setInputPlaceholderById('citizen-forgot-password-confirm', copy.confirmPasswordPlaceholder);
  const forgotPasswordButtons = document.querySelectorAll('#citizen-forgot-password-section .portal-action-row:last-of-type button');
  if (forgotPasswordButtons[0]) forgotPasswordButtons[0].textContent = copy.backToLogin;
  if (forgotPasswordButtons[1]) forgotPasswordButtons[1].textContent = copy.resetPassword;

  setText('#citizen-signup-section .portal-signup-bar', copy.signupBar);
  setText('#citizen-signup-section .portal-signup-head h4', copy.signupHeading);
  setHtml('#citizen-signup-section .portal-signup-head p', copy.mandatoryHtml);
  setLabelByFor('citizen-signup-name', copy.name, true);
  setLabelByFor('citizen-signup-address', copy.address, true);
  setInputPlaceholderById('citizen-signup-address', copy.addressPlaceholder);
  setLabelByFor('citizen-signup-locality', copy.locality);
  setInputPlaceholderById('citizen-signup-locality', copy.localityPlaceholder);
  setLabelByFor('citizen-signup-state', copy.state, true);
  setSelectFirstOption('citizen-signup-state', copy.stateDefault);
  setLabelByFor('citizen-signup-pincode', copy.pincode, true);
  setLabelByFor('citizen-signup-phone', copy.phone);
  setInputPlaceholderById('citizen-signup-phone', copy.phonePlaceholder);
  setLabelByFor('citizen-signup-username', copy.username, true);
  setInputPlaceholderById('citizen-signup-username', copy.usernamePlaceholder);
  setLabelByFor('citizen-signup-aadhaar', copy.aadhaar, true);
  setInputPlaceholderById('citizen-signup-aadhaar', copy.aadhaarPlaceholder);
  setText('#citizen-signup-section .auth-help', copy.aadhaarHelp);
  setLabelByFor('citizen-signup-password', copy.password, true);
  setInputPlaceholderById('citizen-signup-password', copy.createPasswordPlaceholder);
  setHtml('#citizen-signup-section .portal-fieldset legend', `${copy.gender} <span class="portal-required">*</span>`);

  const genderLabels = document.querySelectorAll('#citizen-signup-section .portal-radio-option');
  (copy.genderOptions || []).forEach((text, index) => {
    const label = genderLabels[index];
    const input = label ? label.querySelector('input') : null;
    if (!label || !input) return;
    label.textContent = '';
    label.appendChild(input);
    label.append(` ${text}`);
  });

  setLabelByFor('citizen-signup-sub-locality', copy.subLocality);
  setInputPlaceholderById('citizen-signup-sub-locality', copy.subLocalityPlaceholder);
  setLabelByFor('citizen-signup-country', copy.country, true);
  setLabelByFor('citizen-signup-district', copy.district, true);
  const districtSelect = document.getElementById('citizen-signup-district');
  const stateSelect = document.getElementById('citizen-signup-state');
  if (districtSelect && districtSelect.options[0]) {
    districtSelect.options[0].textContent = stateSelect && stateSelect.value ? copy.districtDefault : copy.stateFirstDefault;
  }
  setLabelByFor('citizen-signup-mobile', copy.mobileNumber, true);
  setLabelByFor('citizen-signup-email', copy.email, true);
  setLabelByFor('citizen-signup-confirm-password', copy.confirmPassword, true);
  setInputPlaceholderById('citizen-signup-confirm-password', copy.confirmPasswordPlaceholder);
  setLabelByFor('citizen-signup-captcha-input', copy.signupSecurityCode, true);
  const signupButtons = document.querySelectorAll('#citizen-signup-section .portal-action-row button');
  if (signupButtons[0]) signupButtons[0].textContent = copy.backToLogin;
  if (signupButtons[1]) signupButtons[1].textContent = copy.createAccount;

  setText('#citizen-auth-status .auth-badge', copy.verifiedCitizen);
  const statusHeading = document.getElementById('citizen-auth-heading');
  if (statusHeading && (!statusHeading.textContent || statusHeading.textContent.trim() === 'Login successful' || statusHeading.textContent.trim() === 'लॉगिन सफल')) {
    statusHeading.textContent = copy.loginSuccessful;
  }
  const statusSubtitle = document.getElementById('citizen-auth-subtitle');
  if (statusSubtitle && (!statusSubtitle.textContent || statusSubtitle.textContent.trim() === 'Ab aap complaint submit kar sakte hain.' || statusSubtitle.textContent.trim() === 'Now you can submit your complaint.' || statusSubtitle.textContent.trim() === 'अब आप शिकायत दर्ज कर सकते हैं।')) {
    statusSubtitle.textContent = copy.loggedInSubtitle;
  }
  setText('#citizen-auth-status .citizen-auth-actions .cta-btn', copy.statusBackToLogin);

  const summaryLabels = document.querySelectorAll('#citizen-auth-status .citizen-summary-item span');
  (copy.summaryLabels || []).forEach((text, index) => {
    if (summaryLabels[index]) {
      summaryLabels[index].textContent = text;
    }
  });
}

function setOptionText(selectId, defaultText, items) {
  const select = document.getElementById(selectId);
  if (!select || !select.options.length) return;

  if (defaultText && select.options[0]) {
    select.options[0].textContent = defaultText;
  }

  if (Array.isArray(items)) {
    items.forEach((item, index) => {
      if (select.options[index + 1] && item) {
        select.options[index + 1].textContent = item;
      }
    });
  }
}

function applyComplaintTranslations(copy) {
  setText('#complaint-page .section-title', copy.complaintTitle);
  setText('#complaint-page .section-subtitle', copy.complaintSubtitle);
  setText('#complaint-page h3[data-i18n="complaint.form.userDetails"]', copy.complaintDetailsHeading);

  const setFieldLabel = (fieldId, text) => {
    const field = document.getElementById(fieldId);
    const label = field ? field.closest('.form-group')?.querySelector('.form-label') : null;
    if (label && text) label.textContent = text;
  };

  const setFieldLabelWithControls = (fieldId, text) => {
    const field = document.getElementById(fieldId);
    const label = field ? field.closest('.form-group')?.querySelector('.form-label') : null;
    if (!label || !text) return;
    const firstTextNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (firstTextNode) {
      firstTextNode.textContent = `${text} `;
    } else {
      label.insertBefore(document.createTextNode(`${text} `), label.firstChild);
    }
  };

  const setFieldPlaceholder = (fieldId, text) => {
    const field = document.getElementById(fieldId);
    if (field && text) field.placeholder = text;
  };

  const setFieldHelp = (fieldId, text) => {
    const field = document.getElementById(fieldId);
    const help = field ? field.closest('.form-group')?.querySelector('small') : null;
    if (help && text) help.textContent = text;
  };

  setFieldLabel('user-name', copy.complaintName);
  setFieldLabel('user-email', copy.complaintEmail);
  setFieldLabel('user-phone', copy.complaintPhone);
  setFieldLabel('user-state', copy.complaintState);
  setFieldLabel('user-city', copy.complaintCity);
  setFieldLabel('user-pincode', copy.complaintPincode);
  setFieldLabel('complaint-title', copy.complaintTitleLabel || 'Complaint Title');
  setFieldLabel('complaint-priority', copy.complaintPriorityLabel || 'Priority');
  setFieldLabel('complaint-category', copy.complaintCategoryLabel || 'Category');
  setFieldLabel('complaint-department', copy.complaintDepartmentLabel || 'Department');
  setFieldLabelWithControls('complaint-description', copy.complaintDescriptionLabel || 'Detailed Description');

  const uploadLabel = document.getElementById('fileUploadArea')?.closest('.form-group')?.querySelector('.form-label');
  if (uploadLabel) uploadLabel.textContent = copy.complaintAttachmentsLabel || 'Supporting Files';

  const captchaLabel = document.getElementById('captcha-input')?.closest('.form-group')?.querySelector('.form-label');
  if (captchaLabel) captchaLabel.textContent = `${copy.complaintSecurityLabel || 'Security Verification'} *`;

  setFieldPlaceholder('user-name', copy.complaintNamePlaceholder);
  setFieldPlaceholder('user-email', copy.complaintEmailPlaceholder);
  setFieldPlaceholder('user-phone', copy.complaintPhonePlaceholder);
  setFieldPlaceholder('user-pincode', copy.complaintPincodePlaceholder);
  setFieldPlaceholder('complaint-title', copy.complaintTitlePlaceholder || 'Brief description of the issue');
  setFieldPlaceholder('complaint-description', copy.complaintDescriptionPlaceholder || 'Please provide detailed description of your complaint...');
  setFieldPlaceholder('captcha-input', copy.captchaPlaceholder || 'Enter the code above');

  setFieldHelp('user-phone', copy.phoneHelp);
  setFieldHelp('user-pincode', copy.pincodeHelp);

  setOptionText('user-state', copy.stateDefault);
  const citySelect = document.getElementById('user-city');
  if (citySelect && citySelect.options[0]) {
    citySelect.options[0].textContent = copy.cityDefault;
  }

  setOptionText('complaint-priority', copy.priorityDefault, copy.priorityOptions);
  setOptionText('complaint-category', copy.categoryDefault, copy.categoryOptions);
  setOptionText('complaint-department', copy.departmentDefault, copy.departmentOptions);

  const uploadArea = document.getElementById('fileUploadArea');
  if (uploadArea) {
    const uploadText = uploadArea.querySelector('p');
    const uploadHelp = uploadArea.querySelector('small');
    if (uploadText) uploadText.textContent = copy.fileUploadText;
    if (uploadHelp) uploadHelp.textContent = copy.fileUploadHelp;
  }

  const captchaSection = document.querySelector('#complaint-page [onclick="generateCaptcha()"]');
  if (captchaSection) {
    captchaSection.textContent = `🔄 ${copy.captchaRefresh}`;
  }

  const captchaHelp = document.querySelector('#complaint-page .form-group[style*="background: var(--bg-light)"] small');
  if (captchaHelp) {
    captchaHelp.textContent = copy.captchaHelp;
  }
}

function applyTrackTranslations(copy) {
  setText('#track-page .section-title', copy.trackTitle);
  setText('#track-page .section-subtitle', copy.trackSubtitle);
  setText('#track-page .form-label', copy.trackLabel);
  setPlaceholder('#tracking-id', copy.trackPlaceholder);
  setText('#track-page .cta-btn', `🔍 ${copy.search}`);
}

function applyHomeTranslations(langCode) {
  const copy = { ...homePageLocalized.en, ...(homePageLocalized[langCode] || {}) };

  const sections = document.querySelectorAll('#home-page .page-section');
  if (sections[1]) {
    const title = sections[1].querySelector('.section-title');
    const subtitle = sections[1].querySelector('.section-subtitle');
    if (title) title.textContent = `📥 ${copy.aiDemoTitle}`;
    if (subtitle) subtitle.textContent = copy.aiDemoSubtitle;

    const prompt = sections[1].querySelector('h3');
    if (prompt) prompt.textContent = `🔍 ${copy.aiDemoPrompt}`;

    const buttons = sections[1].querySelectorAll('.cta-btn');
    copy.aiDemoButtons.forEach((label, index) => {
      if (buttons[index]) buttons[index].textContent = label;
    });
  }

  if (sections[2]) {
    const title = sections[2].querySelector('.section-title');
    if (title) title.textContent = `✨ ${copy.featuresTitle}`;

    const cards = sections[2].querySelectorAll('.feature-card');
    copy.featureCards.forEach((card, index) => {
      const item = cards[index];
      if (!item) return;
      const cardTitle = item.querySelector('h3');
      const description = item.querySelector('p');
      const bulletBox = item.querySelector('div[style*="font-size: var(--font-size-xs)"]');
      if (cardTitle) {
        const emoji = cardTitle.textContent.trim().split(' ')[0];
        cardTitle.textContent = `${emoji} ${card.title}`;
      }
      if (description) description.textContent = card.description;
      if (bulletBox) bulletBox.innerHTML = card.bullets.map((bullet) => `• ${bullet}`).join('<br>');
    });
  }
}

function applyCommonSectionTranslations(copy) {
  const sectionTitles = document.querySelectorAll('.section-title');
  const sectionSubtitles = document.querySelectorAll('.section-subtitle');

  if (sectionTitles[0]) sectionTitles[0].textContent = copy.statsTitle;
  if (sectionSubtitles[0]) sectionSubtitles[0].textContent = copy.statsSubtitle;

  const statLabels = document.querySelectorAll('.stats-grid .stat-label');
  copy.statLabels.forEach((label, index) => {
    if (statLabels[index]) {
      statLabels[index].textContent = label;
    }
  });

  setText('#services-page .section-title', copy.servicesTitle);
  setText('#services-page .section-subtitle', copy.servicesSubtitle);
  setText('#about-page .section-title', copy.aboutTitle);
  setText('#about-page .section-subtitle', copy.aboutSubtitle);
  setText('#team-page .section-title', copy.teamTitle);
  setText('#team-page .section-subtitle', copy.teamSubtitle);
  setText('#contact-page .section-title', copy.contactTitle);
  setText('#contact-page .section-subtitle', copy.contactSubtitle);
  setText('#privacy-page .section-title', copy.privacyTitle);
  setText('#privacy-page .section-subtitle', copy.privacySubtitle);
}

function applyServicesTranslations(copy) {
  const cards = document.querySelectorAll('#services-page .service-item');
  (copy.serviceCards || []).forEach((card, index) => {
    const item = cards[index];
    if (!item) return;

    const title = item.querySelector('h3');
    const description = item.querySelector('p');
    const bullets = item.querySelectorAll('li');

    if (title) {
      const emoji = title.textContent.trim().split(' ')[0];
      title.textContent = `${emoji} ${card.title}`;
    }
    if (description) description.textContent = card.description;
    card.bullets.forEach((bullet, bulletIndex) => {
      if (bullets[bulletIndex]) {
        bullets[bulletIndex].textContent = `• ${bullet}`;
      }
    });
  });
}

function applyServicesTranslations(copy) {
  const cards = document.querySelectorAll('#services-page .service-item');
  (copy.serviceCards || []).forEach((card, index) => {
    const item = cards[index];
    if (!item) return;

    const title = item.querySelector('h3');
    const description = item.querySelector('p');
    const bullets = item.querySelectorAll('li');

    if (title) title.textContent = card.title;
    if (description) description.textContent = card.description;
    card.bullets.forEach((bullet, bulletIndex) => {
      if (bullets[bulletIndex]) {
        bullets[bulletIndex].textContent = bullet;
      }
    });
  });
}

function applyAboutTranslations(copy) {
  const titles = document.querySelectorAll('#about-page h3');
  const mapped = copy.aboutSections && copy.aboutSections.titles ? copy.aboutSections.titles : [];
  mapped.forEach((titleText, index) => {
    if (titles[index]) titles[index].textContent = titleText;
  });
}

function applyExtendedSectionTranslations(langCode) {
  const copy = { ...extendedSectionLocalized.en, ...(extendedSectionLocalized[langCode] || {}) };

  const aboutParagraph = document.querySelector('#about-page .about-intro-card p');
  if (aboutParagraph && copy.aboutParagraphs[0]) aboutParagraph.textContent = copy.aboutParagraphs[0];

  const setAboutListText = (selector, items) => {
    const nodes = document.querySelectorAll(selector);
    items.forEach((text, index) => {
      const node = nodes[index];
      if (!node) return;

      const icon = node.querySelector('.about-list-icon');
      if (icon) {
        node.innerHTML = `${icon.outerHTML}${text}`;
      } else {
        node.textContent = text;
      }
    });
  };

  setAboutListText('#about-page .about-card.about-mission li', copy.aboutMission);
  setAboutListText('#about-page .about-card.about-features li', copy.aboutFeatures);

  const teamBadge = document.querySelector('#team-page .team-card .team-badge');
  if (teamBadge) teamBadge.textContent = `🏆 ${copy.teamLeadBadge}`;

  const teamBioNodes = document.querySelectorAll('#team-page .team-card p:nth-of-type(2)');
  copy.teamBios.forEach((bio, index) => {
    if (teamBioNodes[index]) teamBioNodes[index].textContent = bio;
  });

  const teamConnectTitle = document.querySelector('#team-page h4');
  if (teamConnectTitle) teamConnectTitle.textContent = copy.teamConnectTitle;

  const teamButtons = document.querySelectorAll('#team-page [style*="text-align: center"] .cta-btn');
  copy.teamConnectButtons.forEach((label, index) => {
    if (teamButtons[index]) {
      const emoji = teamButtons[index].textContent.trim().split(' ')[0];
      teamButtons[index].textContent = `${emoji} ${label}`;
    }
  });

  const privacyHeaders = document.querySelectorAll('#privacy-page h3, #privacy-page h4');
  copy.privacyHeaders.forEach((label, index) => {
    if (privacyHeaders[index]) privacyHeaders[index].textContent = label;
  });

  const privacyOfficerPara = document.querySelector('#privacy-page h4 + p');
  if (privacyOfficerPara) {
    privacyOfficerPara.innerHTML = `${copy.privacyOfficerText} <br><strong>Email:</strong> privacy@esahyogi.gov.in<br><strong>Phone:</strong> +91-9045201515<br><strong>Last Updated:</strong> September 17, 2025`;
  }

  const footerSections = document.querySelectorAll('.footer-section h3');
  if (footerSections[0]) footerSections[0].textContent = copy.footerQuickLinks;
  if (footerSections[1]) footerSections[1].textContent = copy.footerGovLinks;

  const footerQuickLinks = document.querySelectorAll('.footer-section ul')[0]?.querySelectorAll('li a') || [];
  copy.footerQuickLinkItems.forEach((label, index) => {
    if (footerQuickLinks[index]) footerQuickLinks[index].textContent = label;
  });

  const footerGovLinks = document.querySelectorAll('.footer-section ul')[1]?.querySelectorAll('li a') || [];
  (copy.footerGovLinkItems || []).forEach((label, index) => {
    if (footerGovLinks[index]) footerGovLinks[index].textContent = label;
  });

  const footerCopyright = document.querySelector('.footer-bottom .footer-copyright');
  if (footerCopyright) footerCopyright.innerHTML = copy.footerCopyright;
}

function applyExtendedSectionTranslations(langCode) {
  const copy = { ...extendedSectionLocalized.en, ...(extendedSectionLocalized[langCode] || {}) };

  const aboutParagraph = document.querySelector('#about-page .about-intro-card p');
  if (aboutParagraph && copy.aboutParagraphs[0]) aboutParagraph.textContent = copy.aboutParagraphs[0];

  const setAboutListText = (selector, items) => {
    const nodes = document.querySelectorAll(selector);
    items.forEach((text, index) => {
      const node = nodes[index];
      if (!node) return;

      const icon = node.querySelector('.about-list-icon');
      if (icon) {
        node.innerHTML = `${icon.outerHTML}${text}`;
      } else {
        node.textContent = text;
      }
    });
  };

  setAboutListText('#about-page .about-card.about-mission li', copy.aboutMission);
  setAboutListText('#about-page .about-card.about-features li', copy.aboutFeatures);

  const teamBadge = document.querySelector('#team-page .team-card .team-badge');
  if (teamBadge) teamBadge.textContent = `\uD83C\uDFC6 ${copy.teamLeadBadge}`;

  const teamBioNodes = document.querySelectorAll('#team-page .team-card p:nth-of-type(2)');
  copy.teamBios.forEach((bio, index) => {
    if (teamBioNodes[index]) teamBioNodes[index].textContent = bio;
  });

  const teamConnectTitle = document.querySelector('#team-page .team-connect-panel h4');
  if (teamConnectTitle) teamConnectTitle.textContent = copy.teamConnectTitle;

  const teamButtons = document.querySelectorAll('#team-page .team-connect-actions .cta-btn');
  copy.teamConnectButtons.forEach((label, index) => {
    if (teamButtons[index]) {
      teamButtons[index].textContent = label;
    }
  });

  const privacyHeaders = document.querySelectorAll('#privacy-page h3, #privacy-page h4');
  copy.privacyHeaders.forEach((label, index) => {
    if (privacyHeaders[index]) privacyHeaders[index].textContent = label;
  });

  const privacyOfficerPara = document.querySelector('#privacy-page h4 + p');
  if (privacyOfficerPara) {
    privacyOfficerPara.innerHTML = `${copy.privacyOfficerText} <br><strong>Email:</strong> privacy@esahyogi.gov.in<br><strong>Phone:</strong> +91-9045201515<br><strong>Last Updated:</strong> September 17, 2025`;
  }

  const footerSections = document.querySelectorAll('.footer-section h3');
  if (footerSections[0]) footerSections[0].textContent = copy.footerQuickLinks;
  if (footerSections[1]) footerSections[1].textContent = copy.footerGovLinks;

  const footerQuickLinks = document.querySelectorAll('.footer-section ul')[0]?.querySelectorAll('li a') || [];
  copy.footerQuickLinkItems.forEach((label, index) => {
    if (footerQuickLinks[index]) footerQuickLinks[index].textContent = label;
  });

  const footerGovLinks = document.querySelectorAll('.footer-section ul')[1]?.querySelectorAll('li a') || [];
  (copy.footerGovLinkItems || []).forEach((label, index) => {
    if (footerGovLinks[index]) footerGovLinks[index].textContent = label;
  });

  const footerCopyright = document.querySelector('.footer-bottom .footer-copyright');
  if (footerCopyright) footerCopyright.innerHTML = copy.footerCopyright;
}

function applyTeamTranslations(copy) {
  const teamStatLabels = document.querySelectorAll('#team-page .stats-grid .stat-label');
  (copy.teamStats || []).forEach((label, index) => {
    if (teamStatLabels[index]) {
      teamStatLabels[index].textContent = label;
    }
  });

  const teamRoleNodes = document.querySelectorAll('#team-page .team-card p:first-of-type');
  (copy.teamRoles || []).forEach((role, index) => {
    if (teamRoleNodes[index]) {
      teamRoleNodes[index].textContent = role;
    }
  });
}

function applyContactTranslations(copy) {
  const infoHeadings = document.querySelectorAll('#contact-page .contact-info h3');
  if (infoHeadings[0]) infoHeadings[0].textContent = `📍 ${copy.contactHeadquarters}`;
  if (infoHeadings[1]) infoHeadings[1].textContent = `📞 ${copy.contactHelpline}`;
  if (infoHeadings[2]) infoHeadings[2].textContent = `📧 ${copy.contactEmail}`;
  if (infoHeadings[3]) infoHeadings[3].textContent = `🌐 ${copy.contactSocial}`;

  const infoParagraphs = document.querySelectorAll('#contact-page .contact-info p');
  if (infoParagraphs[1]) {
    infoParagraphs[1].innerHTML = `<strong style="color: var(--saffron); font-size: var(--font-size-lg);">9045201515</strong> ${copy.helplineAvailability}<br>${copy.helplineSchedule}`;
  }

  const responseCardHeading = document.querySelector('#contact-page .contact-info h4');
  if (responseCardHeading) responseCardHeading.textContent = `⌚ ${copy.responseTime}`;

  const responseCardText = document.querySelector('#contact-page .contact-info h4 + p');
  if (responseCardText) responseCardText.textContent = copy.responseTimeText;

  const contactFormHeading = document.querySelector('#contact-page .contact-form h3');
  if (contactFormHeading) contactFormHeading.textContent = copy.sendMessage;

  const labels = document.querySelectorAll('#contact-page .contact-form .form-label');
  if (labels[0]) labels[0].textContent = copy.contactName;
  if (labels[1]) labels[1].textContent = copy.contactEmailLabel;
  if (labels[2]) labels[2].textContent = copy.contactMobile;
  if (labels[3]) labels[3].textContent = copy.contactSubject;
  if (labels[4]) labels[4].textContent = copy.contactMessage;

  const inputs = document.querySelectorAll('#contact-page .contact-form .form-input');
  if (inputs[0]) inputs[0].placeholder = copy.contactNamePlaceholder;
  if (inputs[1]) inputs[1].placeholder = copy.contactEmailPlaceholder;
  if (inputs[2]) inputs[2].placeholder = copy.contactMobilePlaceholder;
  if (inputs[4]) inputs[4].placeholder = copy.contactMessagePlaceholder;

  const mobileHelp = document.querySelector('#contact-page .contact-form small');
  if (mobileHelp) mobileHelp.textContent = copy.contactMobileHelp;

  const subjectSelect = document.querySelector('#contact-page .contact-form select');
  if (subjectSelect && subjectSelect.options.length >= 6) {
    subjectSelect.options[0].textContent = copy.contactSubjectDefault;
    copy.contactSubjectOptions.forEach((option, index) => {
      if (subjectSelect.options[index + 1]) {
        subjectSelect.options[index + 1].textContent = option;
      }
    });
  }

  const sendButton = document.querySelector('#contact-page .contact-form button[type="submit"]');
  if (sendButton) sendButton.textContent = `📤 ${copy.sendMessageButton}`;

  const note = document.getElementById('contact-note');
  if (note) {
    note.innerHTML = `📝 <strong>Note:</strong> ${copy.contactNote}`;
  }
}

function applyContactTranslations(copy) {
  const infoHeadings = document.querySelectorAll('#contact-page .contact-info h3');
  if (infoHeadings[0]) infoHeadings[0].textContent = `ðŸ“ ${copy.contactHeadquarters}`;
  if (infoHeadings[1]) infoHeadings[1].textContent = `ðŸ“ž ${copy.contactHelpline} / ${copy.contactEmail}`;
  if (infoHeadings[2]) infoHeadings[2].textContent = `ðŸŒ ${copy.contactSocial}`;

  const infoParagraphs = document.querySelectorAll('#contact-page .contact-info p');
  if (infoParagraphs[1]) {
    infoParagraphs[1].innerHTML = `<strong style="color: var(--saffron); font-size: var(--font-size-lg);">9759222377</strong> ${copy.helplineAvailability}<br>${copy.helplineSchedule}<br><strong>${copy.contactEmail}:</strong> abhisheksharma0230@gmail.com`;
  }

  const responseCardHeading = document.querySelector('#contact-page .contact-info h4');
  if (responseCardHeading) responseCardHeading.textContent = `âŒš ${copy.responseTime}`;

  const responseCardText = document.querySelector('#contact-page .contact-info h4 + p');
  if (responseCardText) responseCardText.textContent = copy.responseTimeText;

  const contactFormHeading = document.querySelector('#contact-page .contact-form h3');
  if (contactFormHeading) contactFormHeading.textContent = copy.sendMessage;

  const labels = document.querySelectorAll('#contact-page .contact-form .form-label');
  if (labels[0]) labels[0].textContent = copy.contactName;
  if (labels[1]) labels[1].textContent = copy.contactEmailLabel;
  if (labels[2]) labels[2].textContent = copy.contactMobile;
  if (labels[3]) labels[3].textContent = copy.contactSubject;
  if (labels[4]) labels[4].textContent = copy.contactMessage;

  const inputs = document.querySelectorAll('#contact-page .contact-form .form-input');
  if (inputs[0]) inputs[0].placeholder = copy.contactNamePlaceholder;
  if (inputs[1]) inputs[1].placeholder = copy.contactEmailPlaceholder;
  if (inputs[2]) inputs[2].placeholder = copy.contactMobilePlaceholder;
  if (inputs[4]) inputs[4].placeholder = copy.contactMessagePlaceholder;

  const mobileHelp = document.querySelector('#contact-page .contact-form small');
  if (mobileHelp) mobileHelp.textContent = copy.contactMobileHelp;

  const subjectSelect = document.querySelector('#contact-page .contact-form select');
  if (subjectSelect && subjectSelect.options.length >= 6) {
    subjectSelect.options[0].textContent = copy.contactSubjectDefault;
    copy.contactSubjectOptions.forEach((option, index) => {
      if (subjectSelect.options[index + 1]) {
        subjectSelect.options[index + 1].textContent = option;
      }
    });
  }

  const sendButton = document.querySelector('#contact-page .contact-form button[type="submit"]');
  if (sendButton) sendButton.textContent = `ðŸ“¤ ${copy.sendMessageButton}`;

  const note = document.getElementById('contact-note');
  if (note) {
    note.innerHTML = `ðŸ“ <strong>Note:</strong> ${copy.contactNote}`;
  }
}

function applyContactTranslations(copy) {
  const infoHeadings = document.querySelectorAll('#contact-page .contact-info h3');
  if (infoHeadings[0]) infoHeadings[0].textContent = copy.contactHeadquarters;
  if (infoHeadings[1]) infoHeadings[1].textContent = `${copy.contactHelpline} / ${copy.contactEmail}`;
  if (infoHeadings[2]) infoHeadings[2].textContent = copy.contactSocial;

  const infoParagraphs = document.querySelectorAll('#contact-page .contact-info p');
  if (infoParagraphs[1]) {
    infoParagraphs[1].innerHTML = `<strong style="color: var(--saffron); font-size: var(--font-size-lg);">9759222377</strong> ${copy.helplineAvailability}<br>${copy.helplineSchedule}<br><strong>${copy.contactEmail}:</strong> abhisheksharma0230@gmail.com`;
  }

  const responseCardHeading = document.querySelector('#contact-page .contact-info h4');
  if (responseCardHeading) responseCardHeading.textContent = copy.responseTime;

  const responseCardText = document.querySelector('#contact-page .contact-info h4 + p');
  if (responseCardText) responseCardText.textContent = copy.responseTimeText;

  const contactFormHeading = document.querySelector('#contact-page .contact-form h3');
  if (contactFormHeading) contactFormHeading.textContent = copy.sendMessage;

  const labels = document.querySelectorAll('#contact-page .contact-form .form-label');
  if (labels[0]) labels[0].textContent = copy.contactName;
  if (labels[1]) labels[1].textContent = copy.contactEmailLabel;
  if (labels[2]) labels[2].textContent = copy.contactMobile;
  if (labels[3]) labels[3].textContent = copy.contactSubject;
  if (labels[4]) labels[4].textContent = copy.contactMessage;

  const inputs = document.querySelectorAll('#contact-page .contact-form .form-input');
  if (inputs[0]) inputs[0].placeholder = copy.contactNamePlaceholder;
  if (inputs[1]) inputs[1].placeholder = copy.contactEmailPlaceholder;
  if (inputs[2]) inputs[2].placeholder = copy.contactMobilePlaceholder;
  if (inputs[4]) inputs[4].placeholder = copy.contactMessagePlaceholder;

  const mobileHelp = document.querySelector('#contact-page .contact-form small');
  if (mobileHelp) mobileHelp.textContent = copy.contactMobileHelp;

  const subjectSelect = document.querySelector('#contact-page .contact-form select');
  if (subjectSelect && subjectSelect.options.length >= 6) {
    subjectSelect.options[0].textContent = copy.contactSubjectDefault;
    copy.contactSubjectOptions.forEach((option, index) => {
      if (subjectSelect.options[index + 1]) {
        subjectSelect.options[index + 1].textContent = option;
      }
    });
  }

  const sendButton = document.querySelector('#contact-page .contact-form button[type="submit"]');
  if (sendButton) sendButton.textContent = copy.sendMessageButton;

  const note = document.getElementById('contact-note');
  if (note) {
    note.innerHTML = `Note: ${copy.contactNote}`;
  }
}

function applyPageTranslations(langCode) {
  const copy = getPageCopy(langCode);
  applyHomeTranslations(langCode);
  applyCommonSectionTranslations(copy);
  applyComplaintTranslations(copy);
  applyCitizenAuthTranslations(langCode);
  applyTrackTranslations(copy);
  applyServicesTranslations(copy);
  applyAboutTranslations(copy);
  applyExtendedSectionTranslations(langCode);
  applyTeamTranslations(copy);
  applyContactTranslations(copy);
}

window.applyPageTranslations = applyPageTranslations;
window.applyCitizenAuthTranslations = applyCitizenAuthTranslations;
window.getCitizenAuthCopy = getCitizenAuthCopy;

window.addEventListener('languageChanged', (event) => {
  applyPageTranslations(event.detail.language);
});

document.addEventListener('DOMContentLoaded', () => {
  applyPageTranslations(localStorage.getItem('language') || 'en');
});
