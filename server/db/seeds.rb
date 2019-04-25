# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create({ first_name: 'Avriel', last_name: 'Moscovitz',
            company_site: 'Logz.io', company_address: 'Menachem Begin 44, Tel Aviv',
            company_extra_details: '4th floor'})

Order.create( { pickup_point: 'Azrieli Sarona', user_id: 1 } )

OrderItem.create({ order_id: 1 ,name: 'Banana', quantity: 3 })
OrderItem.create({ order_id: 1, name: 'Huggies freedom dry', quantity: 2 })
OrderItem.create({ order_id: 1, name: 'Huggies wipes', quantity: 1 })
