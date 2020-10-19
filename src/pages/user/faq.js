import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  Box,
  AccordionPanel,
  Heading,
  AccordionIcon,
} from "@chakra-ui/core";

const questions = [
  {
    question: "How many active deposits can I have?",
    answer:
      "You may have as many active deposits as you wish, there is no limit on the number of active deposits you may have. but our min active deposit is from $5 to start.",
  },
  {
    question: "How can I invest?",
    answer:
      "To make a investment you must first create an account. Once you are signed up, you can make your first deposit. All deposits must be made through the deposit. You can login using the email and password you used to signup.",
  },
  {
    question: "Is profit accured to my account everyday?",
    answer:
      "The profit is accrued to your account every working hour from Monday to Sunday.",
  },
  {
    question: "How can I withdraw funds?",
    answer:
      "Login to your account using your username and password and check the Request Payment section.",
  },
  {
    question: "I haven't found the answer to my question. What can I do?",
    answer:
      "If you have any questions or concerns please contact us here and we will gladly assist you.",
  },
];

const FAQ = (props) => (
  <>
    <Heading textAlign='center' my={6}>FAQ</Heading>
    <Box>
      {questions.map((qst, i) => (
        <Accordion allowToggle key={i + Math.random()}>
          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="left" fontWeight="semibold" fontSize='lg'>
                {qst.question}
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>{qst.answer}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  </>
);

export default FAQ;
