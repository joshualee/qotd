class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.date :date
      t.text :text

      t.timestamps
    end

    add_index :questions, :date, unique: true
  end
end
