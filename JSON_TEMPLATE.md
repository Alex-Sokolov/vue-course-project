# Шаблон для генерации данных на http://beta.json-generator.com/

http://beta.json-generator.com/NyN5dicg7

``` js
[
  {
    'repeat(11)': {
      id: '{{index()}}',
      isActive: '{{bool()}}',
      balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
      picture: 'http://placehold.it/128x128',
      age: '{{integer(20, 40)}}',
      accessLevel: '{{random("guest", "user", "admin")}}',
      firstName: '{{firstName()}}',
      lastName: '{{surname()}}',
      company: '{{company().toUpperCase()}}',
      email: function (tags) {
        // Email tag is deprecated, because now you can produce an email as simple as this:
        return (this.firstName + '.' + this.lastName + '@' + this.company + tags.domainZone()).toLowerCase();
      },
      phone: '+7 {{phone()}}',
      address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
      about: '{{lorem(1, "paragraphs")}}',
      registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("DD.MM.YYYY")}}'
    }
  }
]
```
