Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


describe('Full Name Field Validation', () => {
  beforeEach('Open website', () => {
    cy.visit('https://demoqa.com/text-box');
  });

  it('Should accept alphanumeric characters and spaces', () => {
    const validName = 'Pliukhin Oleksii123';

    cy.get('#userName')
      .clear()
      .type(validName)
      .should('have.value', validName);
    
    cy.get('#submit').click();
    cy.get('#userName').should('not.have.class', 'error');
    cy.get('p#name.mb-1')
      .should('be.visible')
      .and('contain', `Name:${validName}`);
    });
  
});

describe('Email Field vlidation', () =>{
  beforeEach('Open website', () =>{
    cy.visit('https://demoqa.com/text-box');
  });

  it('Should accept valid email format', () =>{
    const validEmail = 'oleksi.pliukhin@gmail.com';

    cy.get('#userEmail')
      .clear()
      .type(validEmail)
      .should('have.value', validEmail);

    cy.get('#submit').click();
    cy.get('#userEmail').should('not.have.class', 'error');
    cy.get('p#email.mb-1')
      .should('be.visible')
      .and('contain', `Email:${validEmail}`);
    });

  it('Should not accept invalid email format', () =>{
    const invalidEmails = [
      'oleksi.pliukhin@gmailcom', // Missing '.'
      'oleksi.pliukhin@.com', // Missing domain name
      'oleksi@pliukhin@gmail.com', // Two '@' symbols
      'oleksi.pliukhingmail.com', // Missing '@'
      'oleksi.pliukhin@gmail', // Missing  '.com'
      '@gmail.com', // Missing username
      'oleksi.pliukhin@com', // TLD with no domain
      'oleksi.pliukhin@.com.', // Incorrect TLD
      'oleksi..pliukhin@gmail.com', // Double dots in username
      'oleksii',            // Missing '@' symbol and domain
      '123456',               // Just numbers
      'justtext',             // Just text
      '!@#$%',                // Special characters
    ];

    invalidEmails.forEach((invalidEmail) => {
      cy.get('#userEmail')
      .clear()
      .type(invalidEmail)
      .should('have.value', invalidEmail);
    
      cy.get('#submit').click();
      cy.get('#userEmail').should('have.class', 'mr-sm-2 field-error form-control')

    })
  })
  })

  describe('Current Address Field Validation', () =>{
    beforeEach('Open website', () =>{
      cy.visit('https://demoqa.com/text-box');
    });

    it('Should accept multiline input in the Current Address field', () =>{
      const multilineAddress = `43 Getmanska Street
      Apt 47
      Dnipro, Ukraine`;

      cy.get('#currentAddress')
        .clear()
        .type(multilineAddress)
        .should('have.value', multilineAddress)

      cy.get('#submit').click();

      const expectedText = `Current Address :43 Getmanska Street Apt 47 Dnipro, Ukraine`;

      cy.get('#currentAddress').should('not.have.class', 'error');
      cy.get('p#currentAddress.mb-1')
        .should('be.visible')
        .invoke('text') 
        .then((text) => {
        
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        const normalizedExpectedText = expectedText.replace(/\s+/g, ' ').trim();
  
        expect(normalizedText).to.equal(normalizedExpectedText);
        });

      });
    });

    describe('Permanent Address Field Validation', () =>{
      beforeEach('Open website', () =>{
        cy.visit('https://demoqa.com/text-box');
      });
  
      it('Should accept multiline input in the Permanent Address field', () =>{
        const multilineAddress = `5th Avenue
        Apt 55
        NW, USA`;
  
        cy.get('#permanentAddress')
          .clear()
          .type(multilineAddress)
          .should('have.value', multilineAddress)
  
        cy.get('#submit').click();
  
        const expectedText = `Permananet Address :5th Avenue Apt 55 NW, USA`;
  
        cy.get('#permanentAddress').should('not.have.class', 'error');
        cy.get('p#permanentAddress.mb-1')
          .should('be.visible')
          .invoke('text') 
          .then((text) => {
          
          const normalizedText = text.replace(/\s+/g, ' ').trim();
          const normalizedExpectedText = expectedText.replace(/\s+/g, ' ').trim();
    
          expect(normalizedText).to.equal(normalizedExpectedText);
          });
  
        });
      });
      
  describe('Functionality Testing of TextBox', () =>{
    beforeEach('Open website', () => { 
      cy.visit('https://demoqa.com/text-box');
    });

    it('Verify that the form can be submitted when all fields are correctly filled', () => {
      const validName = 'Pliukhin Oleksii123';
      const validEmail = 'oleksi.pliukhin@gmail.com';
      const validCurrentAddress = `43 Getmanska Street Apt 47 Dnipro, Ukraine`;
      const multilineAddress = `5th Avenue Apt 55 NW, USA`;

    cy.get('#userName')
      .clear()
      .type(validName)
      .should('have.value', validName);

    cy.get('#userEmail')
      .clear()
      .type(validEmail)
      .should('have.value', validEmail);

    cy.get('#currentAddress')
      .clear()
      .type(validCurrentAddress)
      .should('have.value', validCurrentAddress)

    cy.get('#permanentAddress')
      .clear()
      .type(multilineAddress)
      .should('have.value', multilineAddress)
  
    cy.get('#submit').click();
    
    cy.get('#userName').should('not.have.class', 'error');
    cy.get('p#name.mb-1').should('be.visible').and('contain', `Name:${validName}`);

    cy.get('#userEmail').should('not.have.class', 'error');
    cy.get('p#email.mb-1').should('be.visible').and('contain', `Email:${validEmail}`);

    const expectedTextCurrent = `Current Address :43 Getmanska Street Apt 47 Dnipro, Ukraine`;

    cy.get('#currentAddress').should('not.have.class', 'error');
    cy.get('p#currentAddress.mb-1').should('be.visible').invoke('text') .then((text) => {
      const normalizedText = text.replace(/\s+/g, ' ').trim();
      const normalizedExpectedText = expectedTextCurrent.replace(/\s+/g, ' ').trim();
        
      expect(normalizedText).to.equal(normalizedExpectedText);
    });
    
    const expectedTextPermanent = `Permananet Address :5th Avenue Apt 55 NW, USA`;
  
    cy.get('#permanentAddress').should('not.have.class', 'error');
    cy.get('p#permanentAddress.mb-1').should('be.visible').invoke('text') .then((text) => {    
      const normalizedText = text.replace(/\s+/g, ' ').trim();
      const normalizedExpectedText = expectedTextPermanent.replace(/\s+/g, ' ').trim();
      
      expect(normalizedText).to.equal(normalizedExpectedText);
    });
    });
    
    it('Try submitting the form with empty fields to ensure validation prevents submission.', () => {
      cy.get('#submit').click();
          
      cy.get('p#name.mb-1').should('not.exist');
      cy.get('p#email.mb-1').should('not.exist');
      cy.get('p#currentAddress.mb-1').should('not.exist');
      cy.get('p#permanentAddress.mb-1').should('not.exist');
  });
});








