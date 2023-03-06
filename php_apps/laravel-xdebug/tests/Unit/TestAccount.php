<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
class TestAccount extends TestCase
{
    public function testAccount() {
        $account = factory(Account::class)->create();
        $id =;
        $transactions = factory(Account::class, 2)->create([
            'account_id' => $account->id
        ]);

        $this->postJson('graphql', [
            'query' => <<<GQL
              query ($id: ID!) {
                account(id: $id) {
                    id
                    name
                    transactions {
                        id
                        amount
                    }
                }
              }
            GQL,
            'variables' => [
                'id' => $account->id
            ]
        ])
            ->assertJsonFragment(['name' => $account->name ])
            ->assertJsonFragment([
                'id' => $transactions[0]->id
                'amount' => $transactions[0]->amount
            ])
        ->assertJsonFragment([
            'id' => $transactions[1]->id
            'amount' => $transactions[1]->amount
        ]);
    }
}
