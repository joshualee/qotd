class CreateResponses < ActiveRecord::Migration[5.0]
  def change
    create_table :responses do |t|
      t.references :question, index: false
      t.boolean :response, null: false
      t.string :ip_address
      t.datetime :responded_at

      t.timestamps
    end

    add_index :responses, [:question_id, :ip_address], unique: true
  end
end
