//initialize jspsych
const jsPsych = initJsPsych({
    fullscreen: true,
    //display data at the end of the experiment
    on_finish: function() {
        jsPsych.data.displayData();
         jspsych.data.get().csv();
    }
});

// Define the total number of stimuli
const totalStimuli = stimuli_variables.length;
const numRandomTrials = 20;
const practiceStimuli = jsPsych.randomization.sampleWithoutReplacement(stimuli_variables, numRandomTrials);
const numExperimentTrials = 280;
const remainingStimuli = stimuli_variables.filter(stimulus => !practiceStimuli.includes(stimulus));
const experimentStimuli = jsPsych.randomization.sampleWithoutReplacement(remainingStimuli, numExperimentTrials);


//create timeline
var timeline = [];


/* Stores info received by Pavlovia */
var pavloviaInfo;

/* init connection with pavlovia.org */
var pavlovia_init = {
  type: jsPsychPavlovia,
  command: "init",
  // Store info received by Pavlovia init into the global variable `pavloviaInfo`
  setPavloviaInfo: function (info) {
    console.log(info);
    pavloviaInfo = info;
  }
};
timeline.push(pavlovia_init);


//enter fullscreen mode

var enter_fullscreen = {
    type: jsPsychFullscreen,
    stimulus: 'This trial launch in fullscreen mode when you click the button below.',
    choices: ['Continue']
  }
  timeline.push(enter_fullscreen);

var trial = {
    type: jsPsychVirtualChinrest,
    blindspot_reps: 3,
    resize_units: "none"
};

const randomCode = generateRandomCode(5); // Change to the desired code length

// Add the random code to the subject ID
var subject_id = randomCode;
// This adds a property called 'subject' and a property called 'condition' to every trial
jsPsych.data.addProperties({
  subject: subject_id,
});

// Function to generate a random completion code
function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

 var welcome = {
    timeline: [
       
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus:
                "<h2>Welcome to the experiment.</h2>" +
                "<p>" +
                "This experiment should take roughly 30 minutes to complete." +
                "</p>" +
                "<p>" +
                "First, you will fill out a short questionnaire. After the " +
                "questionnaire, we will assess your reading level in Arabic and English." +
                "</p>" +
                "<p>" +
                "Following this, you will be ready to begin the experiment." +
                "</p>" +
                "<p>" +
                "Press any key to continue." +
                "</p>",
            post_trial_gap: 500 // Add a gap after the welcome screen (in milliseconds)
        },
        {
            type: jsPsychSurveyText,
            questions: [
                { prompt: 'What is your age?', name: 'age', placeholder: '21' },
                { prompt: 'Please enter your email address', name: 'email', placeholder: 'aa100@nyu.edu' },
                { prompt: 'What is your present country of residence?', name: 'country', placeholder: 'United Arab Emirates'}
            ]
        }
    ]
};


timeline.push(welcome);

var consent = {
    timeline: [
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: consent_trial,
            choices: ['Yes', 'No'],
            required: true,
            post_trial_gap: 500, // Adjust as needed
        }
    ],
    timeline_variables: consent_trial, // Assuming consent_trial contains the 'sentence' property
};

timeline.push(consent);



var demographics = {
  timeline: [
    { 
      type: jsPsychSurveyMultiChoice,
      questions: [
        {
          prompt: "What is your biological sex?", 
          name: 'BiologicalSex', 
          options: ['Male', 'Female'], 
          required: true
        }, 
        {
          prompt: "Do you have dyslexia?",
          name: 'Dyslexia',
          options: ['Yes', 'No'],
          required: true
        },
        {
            prompt: "Do you wear corrective lenses?",
            name: 'Lens',
            options: ['Yes, eyeglasses', 'Yes, contact lenses', 'No', 'Unsure'],
            required: true
          },
        {
          prompt: "Which is your dominant hand?", 
          name: 'DomHand', 
          options: ['Left', 'Right'], 
          required: true
        },
        {
          prompt: "Were you born and raised in a multilingual environment?",
          name: 'MultEnv',
          options: ['Yes', 'No'],
          required: true
        },
        {
          prompt: "Did you speak Emirati Arabic at home?",
          name: 'ArabFirst',
          options: ['Yes', 'No'],
          required: true
        },
        {
          prompt: "Which Emirate are you from?",
          name: 'Emirate',
          options: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'],
          required: true
        },

        {
          prompt: "On a scale from 0% to 100%, where 0% means you never use Arabic in your daily life, and 100% means you speak Arabic exclusively, how would you rate the frequency with which you <b>speak Arabic</b> in your day-to-day activities?",
          name: 'SpeakinArabic',
          options: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
          required: true
        },
        {
          prompt: "On a scale from 0% to 100%, where 0% means you never read Arabic in your daily life, and 100% means you read in Arabic exclusively, how would you rate the frequency with which you <b>read in Arabic</b> in your day-to-day activities?",
          name: 'ReadinArabic',
          options: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
          required: true
        },
        {
          prompt: "On a scale from 0% to 100%, where 0% means you never write in Arabic in your daily life, and 100% means you write Arabic exclusively, how would you rate the frequency with which you <b>write in Arabic</b> in your day-to-day activities?",
          name: 'WriteinArabic',
          options: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
          required: true
        },
        {
          prompt: "On a scale from 0% to 100%, where 0% means you never use social media in your daily life, and 100% means you use social media on a daily basis, how would you rate the frequency with which you <b>use social media</b> in your day-to-day activities?",
          name: 'SocialMedia',
          options: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
          required: true
        },
        
        {
          prompt: "On a scale from 0% to 100%, where 0% means you never use Modern Standard Arabic (Fus-ha) on social media in your daily life, and 100% means you use Modern Standard Arabic on social media exclusively, how would you rate the frequency with which you <b>use Modern Standard Arabic on social media</b> in your day-to-day activities?",
          name: 'MSASocialMedia',
          options: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
          required: true
        },
        {
          prompt: "On a scale from 0% to 100%, where 0% means you never use Emirati Arabic on social media in your daily life, and 100% means you use Emirati Arabic on social media exclusively, how would you rate the frequency with which you <b>use Emirati Arabic on social media</b> in your day-to-day activities?",
          name: 'EASocialMedia',
          options: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
          required: true
        },
        {
          prompt: "On a scale from 0% to 100%, where 0% means you never use Arabizi (m3rab)on social media in your daily life, and 100% means you use Arabizi on social media exclusively, how would you rate the frequency with which you <b>use Arabizi on social media</b> in your day-to-day activities?",
          name: 'm3rabSocialMedia',
          options: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
          required: true
        },
          {
          prompt: "Which Social Media Platform do you frequent the most? (Please Select 1)",
          name: 'SocialMediaPlatforms',
          options: ['Facebook', 'Instagram', 'LinkedIn', 'SnapChat', 'TikTok', 'Twitter', 'Whatsapp', 'YouTube'],
          required: true
        },
      ]
},
        // Other questions...
      ]
    };

timeline.push(demographics);


    // Add a new trial after spr_timeline to change direction back to ltr
var changeDirectionToLTR = {
            type: jsPsychHtmlKeyboardResponse,
          stimulus: "<p>" +
        "Multiple passages will be presented on the screen, and your task is to read at a comfortable pace." +
        "</p>" +
        "<p>" +
        "Once you've finished reading, additional instructions or questions may follow." +
        "</p>" +
        "<p>" +
        "Press any key to begin." +
        "</p>",
            on_start: function () {
                document.querySelector('body').classList.remove('rtl-text');
                document.querySelector('body').classList.add('ltr-text');
            }
        };

        // Add the changeDirectionToLTR trial to the end of your timeline
        timeline.push(changeDirectionToLTR);
 
    
        var natural_ِMSA_timeline = {
            timeline: [
                {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: `
                        <div style="font-size: 32px; line-height: 1.5;">
                            كانَ أبي يوصي أَخَويَّ بالنّخلِ، كما كانَتْ أُمّي توصيني كُلَّ فجرٍ، وهي تُلقي تعليماتِها اليوميّةَ بِكَنْسِ الدّارِ وإِطعامِ الدّجاجِ، وأنْ أُسقيَ النّعناعةَ، وعندَما كُنْتُ أنسى - كُنُْتُ دائماً على عجلةٍ مِنْ أمري، أؤدّي تلكَ الواجباتِ قبلَ الذّهابِ إلى المدرسةِ - كانَتْ تغضبُ، ويعلو صوتُها موَبِّخَةً:"حرامٌ عليكِ يا بُنيّتي، هذا فألٌ سيّءٌ، رَبُّنا يمدُّ في عُمرِ أبيكِ،وَيُبقي الدّارَ عامراً" ولكنَّ اللّهَ لمْ يمدَّ في عُمرِهِ، ولا في عُمرِها، حتّى أخَوَايَ ذَهبا، فأصبَحْتُ أنا - بعدَ أنْ أَقَمْتُ في القاهرةِ- كالمقطوعةِ مِنْ شجرةٍ،وَبدا أنّني نسيتُ النّعناعةَ والصّبّارةَ والنّخلةَ، وَ كُلَّ شَيءٍ 
                        </div>
                        <p style='font-style: italic; font-size: 16px;'>Press enter when done reading.</p>
                    `,
                    choices: ['Enter'],
                    response_ends_trial: true
                },
                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: `
                        <p style='font-size: 24px;'>هل تؤدّي الرّاوية مهامّها بهدوءٍ وتأنًّ؟</p>
                    `,
                    choices: ['<span style="font-size: 16px;">نعم</span>', '<span style="font-size: 16px;">لا</span>'],
                    correct: 1,
                    data: {
                        condition: 'natural reading',
                        correct_response: 1,

                    },
                    on_finish: function (data) {
                        console.log("Response: ", data.response);
                        console.log("Correct Response: ", data.correct_response);
                        // Assuming data.correct_response and data.response are present in your data
                        data.question_response = data.response === data.correct_response;
                        data.correct = data.response === data.correct_response;
                        console.log("Timeline after question_screen:", jsPsych.data.get());
                    }
                },
        
                {
                    type: jsPsychHtmlKeyboardResponse,
                    trial_duration: 1000,
                    stimulus: function () {
                        // Check the correctness of the last response
                        if (jsPsych.data.get().last(1).select('correct').values[0] == true) {
                            return "<p>Correct!</p>"; // Return the feedback
                        } else {
                            return "<p>Incorrect.</p>"; // Return the feedback
                        }
                    }
                },
                
                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: `
                        <p style='font-size: 24px;'>هل أقامت الراوية في القاهرةِ؟</p>
                    `,
                    choices: ['<span style="font-size: 16px;">نعم</span>', '<span style="font-size: 16px;">لا</span>'],
                    correct: 0,
                    data: {
                        condition: 'natural reading',
                        correct_response: 0,
                    },
                    on_finish: function (data) {
                        console.log("Response: ", data.response);
                        console.log("Correct Response: ", data.correct_response);
                        // Assuming data.correct_response and data.response are present in your data
                        data.question_response = data.response === data.correct_response;
                        data.correct = data.response === data.correct_response;
                        console.log("Timeline after question_screen:", jsPsych.data.get());
                    }
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    trial_duration: 1000,
                    stimulus: function () {
                        // Check the correctness of the last response
                        if (jsPsych.data.get().last(1).select('correct').values[0] == true) {
                            return "<p>Correct!</p>"; // Return the feedback
                        } else {
                            return "<p>Incorrect.</p>"; // Return the feedback
                        }
                    }
                }
            ]
        };
  timeline.push(natural_ِMSA_timeline);

        var natural_ِEA_timeline = {
            timeline: [
                {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: `
                        <div style="font-size: 32px; line-height: 1.5;">
                            كانت العيوز أم البرقع الأخضر العنقاش تخزني بنظرات مستفزة، شكله ويهي المكشوف ما يعيبها. لفيت ويهي وأول ما سويت جي، نقزت من كرسيها جنها ياهل ويلست عدالي. “مرت ربع ساعة وأنا أتريا دوري” جي بدت تسولف وياي بدون مقدمات، وهي تضك عمرها في المسافة الصغيرة عدالي على الكرسي الخشبي، بعدين كملت تسب إدارة المستشفى، وتعبر عن رايها انه نظام الارقام اليديد حق الانتظار يأخر الناس وايد. ما عيبني رايها وانا اتخيل عمري واقفة جدام الصيدلية مصكوك علي في الزحمة بس نتريا حبوب فيتامينات. “بالعكس انا اجوف انه هذا النظام احسن بوايد، ع الاقل حق الناس اللي شراتج وشراتي ما يتحملون يوقفون في الزحمة وايد.” بوزت في ويهي، وشكله ولدي ما حبها مثلي، شاتني مرة ثانية يوم سمع صوتها وهي تسألني أسئلة وايدة، كلها حش وكلام فاضي.رديت بكلمتين لين ما طفرت مني وهدتني بروحي.
                        </div>
                        <p style='font-style: italic; font-size: 16px;'>Press enter when done reading.</p>
                    `,
                    choices: ['Enter'],
                    response_ends_trial: true
                },
               
                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: `
                        <p style='font-size: 24px;'>هل العيوز نشبة؟</p>
                    `,
                    choices: ['<span style="font-size: 16px;">هيه</span>', '<span style="font-size: 16px;">لا</span>'],
                    correct: 0,
                    data: {
                        condition: 'natural reading',
                        correct_response: 0,
                    },
                    on_finish: function (data) {
                        console.log("Response: ", data.response);
                        console.log("Correct Response: ", data.correct_response);
                        // Assuming data.correct_response and data.response are present in your data
                        data.question_response = data.response === data.correct_response;
                        data.correct = data.response === data.correct_response;
                        console.log("Timeline after question_screen:", jsPsych.data.get());
                    }
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    trial_duration: 1000,
                    stimulus: function () { 
                        // Check the correctness of the last response
                        if (jsPsych.data.get().last(1).select('correct').values[0] == true) {
                            return "<p>Correct!</p>"; // Return the feedback
                        } else {
                            return "<p>Incorrect.</p>"; // Return the feedback
                        }
                    }
                },
                 {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: `
                        <p style='font-size: 24px;'>هل القصة استوت  في المستشفى؟</p>
                    `,
                    choices: ['<span style="font-size: 16px;">هيه</span>', '<span style="font-size: 16px;">لا</span>'],
                    correct: 0,
                    data: {
                        condition: 'natural reading',
                        correct_response: 0,
                    },
                    on_finish: function (data) {
                        console.log("Response: ", data.response);
                        console.log("Correct Response: ", data.correct_response);
                        // Assuming data.correct_response and data.response are present in your data
                        data.question_response = data.response === data.correct_response;
                        data.correct = data.response === data.correct_response;
                        console.log("Timeline after question_screen:", jsPsych.data.get());
                    }
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    trial_duration: 1000,
                    stimulus: function () {
                        // Check the correctness of the last response
                        if (jsPsych.data.get().last(1).select('correct').values[0] == true) {
                            return "<p>Correct!</p>"; // Return the feedback
                        } else {
                            return "<p>Incorrect.</p>"; // Return the feedback
                        }
                    }
                },
                
            ]
        };

  timeline.push(natural_ِEA_timeline);

  var natural_ِEnglish_timeline = {
            timeline: [
                {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: `
                        <div style="font-size: 32px; line-height: 1.5;">
                            Open your eyes in seawater and it is difficult to see much more than a murky, bleary green color. Sounds, too, are garbled and difficult to comprehend. Without specialized equipment humans would be lost in these deep-sea habitats, so how do fish make it seem so easy? Much of this is due to a biological phenomenon known as electroreception – the ability to perceive and act upon electrical stimuli as part of the overall senses. This ability is only found in aquatic or amphibious species because water is an efficient conductor of electricity.  
                        </div>
                        <p style='font-style: italic; font-size: 16px;'>Press enter when done reading.</p>
                    `,
                    choices: ['Enter'],
                    response_ends_trial: true
                },
                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: `
                        <p style='font-size: 24px;'>Is electroception possible underwater?</p>
                    `,
                    choices: ['<span style="font-size: 16px;">Yes</span>', '<span style="font-size: 16px;">No</span>'],
                    correct: 0,
                    data: {
                        condition: 'natural reading',
                        correct_response: 0,
                    },
                    on_finish: function (data) {
                        console.log("Response: ", data.response);
                        console.log("Correct Response: ", data.correct_response);
                        // Assuming data.correct_response and data.response are present in your data
                        data.question_response = data.response === data.correct_response;
                        data.correct = data.response === data.correct_response;
                        console.log("Timeline after question_screen:", jsPsych.data.get());
                    }
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    trial_duration: 1000,
                    stimulus: function () {
                        // Check the correctness of the last response
                        if (jsPsych.data.get().last(1).select('correct').values[0] == true) {
                            return "<p>Correct!</p>"; // Return the feedback
                        } else {
                            return "<p>Incorrect.</p>"; // Return the feedback
                        }
                    }
                },
                
                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: `
                        <p style='font-size: 24px;'>Do humans use electroception to perceive their environment?</p>
                    `,
                    choices: ['<span style="font-size: 16px;">Yes</span>', '<span style="font-size: 16px;">No</span>'],
                    correct: 1,
                    data: {
                        condition: 'natural reading',
                        correct_response: 1,
                    },
                    on_finish: function (data) {
                        console.log("Response: ", data.response);
                        console.log("Correct Response: ", data.correct_response);
                        // Assuming data.correct_response and data.response are present in your data
                        data.question_response = data.response === data.correct_response;
                        data.correct = data.response === data.correct_response;
                        console.log("Timeline after question_screen:", jsPsych.data.get());
                    }
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    trial_duration: 1000,
                    stimulus: function () { 
                        // Check the correctness of the last response
                        if (jsPsych.data.get().last(1).select('correct').values[0] == true) {
                            return "<p>Correct!</p>"; // Return the feedback
                        } else {
                            return "<p>Incorrect.</p>"; // Return the feedback
                        }
                    }
                }
            ]
        };
  timeline.push(natural_ِEnglish_timeline);

 var natural_ِArabizi_timeline = {
            timeline: [
                {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: `
                        <div style="font-size: 32px; line-height: 1.5;">
                            4hrt Noura mn elbait w 3la mlam7ha ebtisamah hadiya jamila. Sho 27la mn elwa7d y96b7 bwayh el3’la klh w nb3 el7nan w el7b klh “elwaldah” 7ta lw ykon el2nsan mtkdr w mt9’ayj w yshof hl wyooh elsim7ah mn 9aba7 Allah 5air t3’yer elmazaj 180 darajah. rkbat sayarat'ha el Camry w rb3at elbshkarah tft7lha elbab el3od. 8bl ma t7arik sayarat'ha sh3’alat el radio 3la e4a3at el8ra'an, tsm3 eld3a2 eli kl youm y76oonh f hal wagt w hyi tlbas n8abha. Kan el jaw barid elyoum zyadah 3n 2ms. W 6b3an 2l7een fi bdayat elshita elshar3 bd2 yzd7m blsyayeer, el kl raye7 sh3’lh shrat Noura.
                        </div>
                        <p style='font-style: italic; font-size: 16px;'>Press enter when done reading.</p>
                    `,
                    choices: ['Enter'],
                    response_ends_trial: true
                },
                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: `
                        <p style='font-size: 24px;'>Hal Noura sayra elbait?</p>
                    `,
                    choices: ['<span style="font-size: 16px;">Haih</span>', '<span style="font-size: 16px;">La</span>'],
                    correct: 1,
                    data: {
                        condition: 'natural reading',
                        correct_response: 1,
                    },
                    on_finish: function (data) {
                        console.log("Response: ", data.response);
                        console.log("Correct Response: ", data.correct_response);
                        // Assuming data.correct_response and data.response are present in your data
                        data.question_response = data.response === data.correct_response;
                        data.correct = data.response === data.correct_response;
                        console.log("Timeline after question_screen:", jsPsych.data.get());
                    }
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    trial_duration: 1000,
                    stimulus: function () {
                        // Check the correctness of the last response
                        if (jsPsych.data.get().last(1).select('correct').values[0] == true) {
                            return "<p>Correct!</p>"; // Return the feedback
                        } else {
                            return "<p>Incorrect.</p>"; // Return the feedback
                        }
                    }
                },
                
                {
                    type: jsPsychHtmlButtonResponse,
                    stimulus: `
                        <p style='font-size: 24px;'>Hal Noura t7b tchof 2mha?</p>
                    `,
                    choices: ['<span style="font-size: 16px;">Haih</span>', '<span style="font-size: 16px;">La</span>'],
                    correct: 0,
                    data: {
                        condition: 'natural reading',
                        correct_response: 0,
                    },
                    on_finish: function (data) {
                        console.log("Response: ", data.response);
                        console.log("Correct Response: ", data.correct_response);
                        // Assuming data.correct_response and data.response are present in your data
                        data.question_response = data.response === data.correct_response;
                        data.correct = data.response === data.correct_response;
                        console.log("Timeline after question_screen:", jsPsych.data.get());
                    }
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    trial_duration: 1000,
                    stimulus: function () { 
                        // Check the correctness of the last response
                        if (jsPsych.data.get().last(1).select('correct').values[0] == true) {
                            return "<p>Correct!</p>"; // Return the feedback
                        } else {
                            return "<p>Incorrect.</p>"; // Return the feedback
                        }
                    }
                }
            ]
        };
  timeline.push(natural_ِArabizi_timeline);
       
var startExperiment = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>You're done with the Arabic and English reading assessment and ready to begin the experiment.</p>
             <p>Press any key to read the instructions.</p>`,
};
timeline.push(startExperiment);


  //define instructions & add 2 second gap afterwards
        var instructions = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <p><b>Instructions:</b></p>
            <p>Each screen will show either an word in <b> Modern Standard Arabic,</b> <b>Emirati Arabic,</b> <b>Emirati English (m3rab),</b> <b> and English</b> or letters that do not form a word.</p>
            <p>Press <strong>L</strong> if the letters form a valid word.</p>
            <p>Press <strong>A</strong> if the letters do not form a valid word.</p>
            <p>React as fast as you can! Press any key to start the practice round.</p>
              `,
            post_trial_gap: 2000,
        };
        timeline.push(instructions);

  //define fixation
        var fixation = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: '<div style="font-size:60px;">+</div>',
            choices: 'NO_KEYS',
            trial_duration: 895,
            task: 'fixation',
        };
        
//define trial stimuli array for timeline variables 
       
  

 //define test trial
 var test = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">######</div>',
    choices: ["a","l"],
    trial_duration: 67,
};

// Define the blank screen
        var blank_screen = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: '',
             trial_duration: 30,
            };

// Define the backward mask (same as the forward mask)
         var backward_mask = {
           type: jsPsychHtmlKeyboardResponse,
          stimulus: '<div style="font-size:60px;">######</div>',
          trial_duration: 0, // Immediate display
             };
             
var response_alternatives = {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: function () {
                    var arabicText = jsPsych.timelineVariable('Target');
                    console.log('Arabic Text:', arabicText); // Add this line for debugging
            
                    // Get the non-word and word stimuli
                    var nonWordStimulus = `<div style="position: absolute; bottom: 200px; text-align: center; font-size:30px; left: 200px;">Non-Word</div>`;
                    var wordStimulus = `<div style="position: absolute; bottom: 200px; text-align: center; font-size:30px; right: 200px;">Word</div>`;
                    var arabicTextStimulus = `<div style="font-size: 60px;">${arabicText}</div>`;
        
                    // Combine non-word, word, and ArabicText stimuli
                    var html = `${nonWordStimulus}${wordStimulus}${arabicTextStimulus}`;
            
            
                    return html;
                },
                choices: ['a', 'l'],
                trial_duration: 5000,
                data: {
                    task: 'response',
                    correct_word_validity: jsPsych.timelineVariable('Word_Validity'),
                    target:jsPsych.timelineVariable('Target'),
                    word_validity:jsPsych.timelineVariable('Word_Validity'),
                    target_word_length:jsPsych.timelineVariable('Target_Word_Length'),
                    target_gloss: jsPsych.timelineVariable('Target_Gloss')
                },
                on_finish: function (data) {
                    console.log("Response: ", data.response);
                    console.log("Correct Response Word Validity: ", data.correct_word_validity);
            
                    // Check for correctness based on Word_Validity
                    data.question_response = data.response === 'l' && data.correct_word_validity === 'valid' ||
                        data.response === 'a' && data.correct_word_validity === 'invalid';
            
                    data.correct = data.question_response;
            
                    console.log("Timeline after question_screen:", jsPsych.data.get());
                },
            };
            
    
var feedback = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 1000,
  stimulus: function(){
    // Check if the response is null
    var last_trial_response = jsPsych.data.get().last(1).values()[0].response;
    if(last_trial_response === null){
      return "<p>No response entered.</p>";
    }

    // Check the accuracy of the last response
    var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
    if(last_trial_correct){
      return "<p>Correct!</p>"; // the parameter value has to be returned from the function
    } else {
      return "<p>Incorrect.</p>"; // the parameter value has to be returned from the function
    }
  }
}

       
// Debrief block
var debrief_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        // Get all trials with a "response" task
        var trials = jsPsych.data.get().filter({ task: 'response' });

        // Calculate accuracy by comparing participants' responses with the correct responses
        var correct_responses = trials.select('correct_response');
        var participant_responses = trials.select('response');
        var correct_count = 0;

        for (var i = 0; i < trials.count(); i++) {
            var correct = trials.select('correct').values[i];

            // Check if the participant's response was correct
            if (correct) {
                correct_count++;
            }
        }

        var accuracy = Math.round((correct_count / trials.count()) * 100);

        // Calculate average response time for all trials
        var rt = Math.round(trials.select('rt').mean());

        return `<p>You responded correctly on ${accuracy}% of the trials.</p>
        <p>Your average response time was ${rt}ms.</p>
        <p>Press any key to complete the experiment. Thank you!!</p>`;
    }
};
timeline.push(debrief_block);

// Debrief block after the practice block
var practice_debrief_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        // Get all trials with a "response" task from the practice block
        var practice_trials = jsPsych.data.get().filter({ task: 'response' }); // Adjust the timeline index if needed

        // Calculate accuracy by comparing participants' responses with the correct responses
        var practice_correct_responses = practice_trials.select('correct_response');
        var participant_responses = practice_trials.select('response');
        var correct_count = 0;

        for (var i = 0; i < practice_trials.count(); i++) {
            var correct = practice_trials.select('correct').values[i];
            // Check if the participant's response was correct
            if (correct) {
                correct_count++;
            }
        }

        var prac_accuracy = Math.round((correct_count / practice_trials.count()) * 100);

        // Calculate average response time for all practice trials
        var prac_rt = Math.round(practice_trials.select('rt').mean());

        return `<p>You responded correctly on ${prac_accuracy}% of the practice trials.</p>
        <p>Your average response time was ${prac_rt}ms.</p>
        <p>Press the spacebar to start the main experiment. Thank you!!</p>`;
    }
};


 // Combine the endPracticeMessage and practice_procedure in a single timeline
var practice_timeline =  {
    timeline: [fixation, test, blank_screen, backward_mask, response_alternatives, feedback],
    timeline_variables: practiceStimuli,
    randomize_order: true,
    repetitions: 1,
};

var separatorMessage = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>Now, it's time for the main experiment.</p>
        <p>You will go through a total of 6 blocks with short breaks in between.</p>
        <p>Press any key to start the main experiment.</p>`,
};

//var endMessage = {
  //ype: jsPsychHtmlKeyboardResponse,
 //stimulus: `<p>You're done with the experiment.</p>
       // choices: ['Spacebar'],
  //response_ends_trial: true,
    //trial_duration: 3000,
//};


var chunk_debrief_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        // Get all trials with a "response" task from the current chunk
        var chunk_trials = jsPsych.data.get().filter({ task: 'response' }).last(50); // Adjust the timeline index if needed

        // Calculate accuracy by comparing participants' responses with the correct responses
        var chunk_correct_responses = chunk_trials.select('correct_response');
        var participant_responses = chunk_trials.select('response');
        var correct_count = 0;

        for (var i = 0; i < chunk_trials.count(); i++) {
            var correct = chunk_trials.select('correct').values[i];
            // Check if the participant's response was correct
            if (correct) {
                correct_count++;
            }
        }

        var chunk_accuracy = Math.round((correct_count / chunk_trials.count()) * 100);

        // Calculate average response time for all trials in the current chunk
        var chunk_rt = Math.round(chunk_trials.select('rt').mean());

        // Get the block number, considering the practice trials
        var block_number = (Math.ceil(jsPsych.data.get().filter({ task: 'response' }).count() / 100));

        return `<p><b>Block accuracy:</b> ${chunk_accuracy}%.</p>
                <p><b>Average response time for the last 50 trials:</b> ${chunk_rt}ms.</p>
                <p>Press any key to continue.</p>`;
    },
};

const completionCodeTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `<p>Your completion code is: <b>${randomCode}</b>.</p> <p>Please copy the completion code and paste it in this survey:</p><p><a href="https://nyu.qualtrics.com/jfe/form/SV_cACibHCfBNEGCsC" target="_blank">Survey</a></p><p>If you are facing any difficulty in receiving payment, please email ha1648@nyu.edu</p><p>When you're done, press Enter to receive the results .</p>`;
  },
  choices: ['Enter'],
  response_ends_trial: true,
};



//var completionCodeTrial = {
  //type: 'jsPsychHtmlKeyboardResponse',
  //stimulus: function () {
   // return `<p>Your completion code is: <b>${randomCode}</b>.</p>
    //<p>Please copy the completion code and paste it in this survey:</p>
  //  <a href="https://nyu.qualtrics.com/jfe/form/SV_cACibHCfBNEGCsC" target="_blank">Survey</a> to receive your payment.
    //</p>
   // <p>If you are facing any difficulty in receiving payment, please email ha1648@nyu.edu</p>
   // <p>When you're done, press the spacebar to exit.</p>`;
 // },
 // choices: ['space'],
  //response_ends_trial: true,
  //trial_duration: 60000
//};
  //timeline.push(completionCodeTrial);

var main_procedure = {
    timeline: [
        fixation, 
        test,
        blank_screen, 
        backward_mask, 
        response_alternatives, 
        feedback,
        { 
            conditional_function: function () {
                return jsPsych.data.get().filter({ task: 'response' }).count() % 50 === 0;
            },
            timeline: [chunk_debrief_block],
        }
    ],
    timeline_variables: experimentStimuli,
    randomize_order: true,
    repetitions: 1, // Run through all  trials once
};

//Michele Suggestion
        var final_download = {
            type: "html-keyboard-response",
            stimulus: "<p>Thank you for your participation</p>" + "<button onclick='download_data()'>Download Results</button>",
            choices: ["space", ' '],
            on_start: function() {
                var data2download = jsPsych.data.get().csv();
                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data2download);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'myData.csv';
                hiddenElement.click();
            }
        };
        timeline.push(final_download)
/* finish connection with pavlovia.org */
var pavlovia_finish = {
    type: jsPsychPavlovia,
    command: "finish",
    participantId: "JSPSYCH-DEMO",
    // Thomas Pronk; your filter function here
    dataFilter: function(data) {
      // Printing the data received from jsPsych.data.get().csv(); a CSV data structure
      console.log(data);
      // You can also access the data directly, for instance getting it as JSON
      console.log(jsPsych.data.get().json());
      // Return whatever data you'd like to store
      return data;
    },
    // Thomas Pronk; call this function when we're done with the experiment and data reception has been confirmed by Pavlovia
    completedCallback: function() {
      alert('data successfully submitted!');
    }
  };

  timeline.push(pavlovia_finish);


// Define the full timeline
var experimentTimeline = [
    pavlovia_init,
    enter_fullscreen,
    consent,
    welcome,
    demographics,
    changeDirectionToLTR,
    natural_ِMSA_timeline,
    natural_ِEA_timeline,
    natural_ِEnglish_timeline,
    natural_ِArabizi_timeline,
    startExperiment,
    instructions,
    practice_timeline,  // Include the practice timeline
    practice_debrief_block,
    separatorMessage,
    main_procedure,
    debrief_block,
    final_download,
    completionCodeTrial,
    pavlovia_finish
    ];

var version = jsPsych.version();
console.log(version);

// Start the experiment
jsPsych.run(experimentTimeline);
