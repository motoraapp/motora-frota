# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 20:03:31. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (8679 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- Gera o QR code do Pix a partir do copia e cola -->
24: <!-- Supabase (banco de dados online) -->
140: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
145: <!-- Header Principal -->
159: <!-- Controles do Header -->
161: <!-- Botão Status Online/Offline (Motorista) -->
169: <!-- Ativar Notificações -->
174: <!-- Temas -->
179: <!-- Logout Button -->
188: <!-- Conteúdo Principal -->
191: <!-- TELA DE LOGIN -->
192: #secLogin
225: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
226: #secDemoEscolha
241: <!-- PAINEL DO MOTORISTA -->
242: #secDriverPanel
244: <!-- Card do Veículo Vinculado -->
258: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
268: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
273: <!-- Aviso: nova versão do app Android -->
276: <!-- Aviso vermelho: notificações desligadas -->
279: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
283: <!-- Aviso de Pix / pagamento pendente -->
286: <!-- Navegação de Abas -->
304: <!-- Conteúdo das Abas Motorista -->
307: <!-- Aba CRLV-e -->
308: #tabDrvCrlv
313: <!-- Renderizado dinamicamente -->
317: <!-- Aba Contrato -->
318: #tabDrvContract
328: <!-- Renderizado dinamicamente -->
332: <!-- Aba Vistoria -->
333: #tabDrvInspection
340: <!-- Aba Pagamento -->
341: #tabDrvPayment
354: <!-- Caução e multas do motorista -->
356: <!-- Valor e descrição da cobrança -->
366: <!-- Seção Pix -->
380: <!-- QR Code Renderizado aqui -->
413: <!-- Seção Upload de Comprovante -->
430: <!-- Lista de comprovantes -->
435: <!-- Recibos quando o contrato está encerrado -->
442: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
443: #secMasterPanel
477: <!-- Aviso: falta criar a tabela dos termos no banco -->
480: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
482: <!-- Lista de Veículos -->
498: <!-- Renderizado via JS -->
505: <!-- Form de Adicionar Veículo -->
539: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
545: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
550: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
555: <!-- Fichas Arquivadas (após marcar caução pago) -->
564: <!-- Form de Adicionar Motorista -->
659: <!-- Barra de baixo do dono (só no design novo) -->
669: <!-- MODAL PRIMEIRO LOGIN -->
670: #modalFirstLogin
704: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
705: #modalNotif
718: <!-- MODAL VISTORIA (MASTER) -->
719: #modalInspection
732: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
733: #modalSettings
824: <!-- MODAL TEMAS -->
825: #modalThemes
836: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
837: #modalCreds
852: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
867: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
868: #modalDriverFile
908: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
937: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
952: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
994: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
995: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
996: #modalRecibo
1015: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1016: #modalPixArea
1032: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1033: #modalIA
1115: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1116: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1117: #modalEditVeh
1136: #modalSenha
1158: #modalMeusRecibos
1176: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1177: #modalEmail
1197: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1198: #modalReport
1213: #modalFinCardDetail
1226: #modalFinance
1259: <!-- FILTROS -->
1309: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1329: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1330: #modalExpenses
1365: <!-- MODAL NOVO PIX -->
1366: #modalNewPix
1418: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1476: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1477: #modalCorrigirRecibo
1491: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1492: #modalDocViewer
1500: #modalDocBody
1501: <!-- Conteúdo pré-visualizado -->
1507: #modalTerms
1521: <!-- NOTIFICAÇÕES TOAST -->
1538: lsGet()
1539: lsSet()
1540: lsDel()
1563: demoLoginRole()
1567: demoId()
1568: demoSave()
1569: demoSaved()
1571: *datas no horário de Brasília*
1572: demoLocal()
1573: demoParts()
1574: demoDay()
1575: demoNextDue()
1580: *dados fictícios (4 meses)*
1581: demoBuild()
1724: *documentos fictícios (imagem gerada na hora)*
1725: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1726: demoDocBlob()
1804: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1805: demoQuery()
1828: out()
1834: run()
1875: demoOnUpdate()
1885: demoOnInsert()
1986: demoClient()
2051: demoStart()
2059: demoStop()
2065: abrirDemo()
2072: trocarDemo()
2077: demoBanner()
2092: toEmail()
2096: showLogin()
2100: esc()
2105: dataHoraBR()
2113: uiDialogo()
2161: uiConfirm()
2170: uiPrompt()
2176: friendlyError()
2186: devicePrefs()
2189: saveDevicePrefs()
2192: docRef()
2193: viewDocIdx()
2195: setBusy()
2233: **TEMAS**
2242: currentTheme()
2247: applyTheme()
2248: openThemes()
2258: pickTheme()
2264: toggleDarkMode()
2266: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2268: loadDesignCfg()
2275: applyDesign()
2292: markMasterNav()
2297: fillDesignCfg()
2302: saveDesign()
2316: showToast()
2325: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2326: senhaErro()
2327: abrirSenha()
2336: salvarIaCodigo()
2346: fecharSenha()
2347: salvarSenha()
2368: loginUserInput()
2373: loginErro()
2377: verSenha()
2382: handleLogin()
2431: logout()
2450: saveFirstLoginPreferences()
2473: carregarDados()
2498: aplicarDados()
2524: loadAndRender()
2551: autoRefresh()
2590: markUpdated()
2595: reload()
2600: renderApp()
2648: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2651: masterBack()
2653: viewAsDriver()
2675: exitViewAs()
2694: viewOnly()
2695: renderViewAsBanner()
2705: showSection()
2710: withBtn()
2718: toggleDriverStatus()
2727: isOnline()
2729: updateStatusToggleUI()
2742: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2751: checkApkUpdate()
2766: updateInstallApkButton()
2786: renderDriverPanel()
3011: switchDriverTab()
3026: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3029: parsePixKey()
3033: normalizePixKey()
3041: pixKeyLooksOk()
3049: togglePixKeyFields()
3055: updatePixKeyPlaceholder()
3061: copyPixKey()
3068: copyPixCode()
3080: receiptBadge()
3090: receiptMasterBox()
3117: receiptAction()
3124: confirmReceipt()
3137: rejectReceipt()
3149: recheckReceipt()
3158: uploadReceipt()
3181: switchMasterTab()
3198: maskPhone()
3207: waLink()
3212: allVeh()
3213: allDrv()
3214: chargeVehicleId()
3226: enviarPedidoParcialAsaas()
3242: pedirPixParcial()
3260: restaurarPixTotal()
3266: responderPixParcial()
3290: contrato30Info()
3320: encerrarContrato()
3337: encerrarContratoPrompt()
3350: reativarContrato()
3374: marcarCaucaoPagoArquivar()
3395: desarquivarFicha()
3413: deliveryInspectionHtml()
3443: uploadDeliveryPhotos()
3470: delDeliveryPhoto()
3488: addCauDesconto()
3513: puxarMultaCaucao()
3534: delCauDesconto()
3556: dfCauDescontosHtml()
3589: dfContratoRender()
3633: encerrarContratoConfirmFicha()
3640: renderMasterPanel()
3802: renderArchivedDrivers()
3847: handleAddVehicle()
3880: deleteVehicle()
3881: cancelDeleteVehicle()
3883: confirmDeleteVehicle()
3907: abrirEditarVeiculo()
3926: fecharEditarVeiculo()
3927: salvarEditarVeiculo()
3957: drvCauMostra()
3964: drvCauLer()
3972: handleAddDriver()
4050: marcarSituacao()
4060: updateDriverPaymentStatus()
4069: deleteDriver()
4070: cancelDeleteDriver()
4072: confirmDeleteDriver()
4095: prepareFile()
4117: uploadFile()
4128: fileUrl()
4139: downloadName()
4143: renderFilePreview()
4163: renderPdfToCanvas()
4190: viewDoc()
4211: **DINHEIRO**
4212: parseMoney()
4219: fmtMoney()
4220: fmtDate()
4221: todayISO()
4223: **CONFIGURAÇÕES (Gemini e Google Drive)**
4225: loadConfigStatus()
4230: paintConfig()
4235: fillOwnerVehicleSelect()
4241: saveOwnerVehicle()
4263: openSettings()
4276: closeSettings()
4277: saveConfig()
4287: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
4288: renderAsaasDrivers()
4315: toggleDriverAsaas()
4347: loadAsaasInfo()
4361: saveAsaas()
4369: testarAsaas()
4376: copiarAsaas()
4380: testDrive()
4387: resyncDrive()
4395: **FICHA DO MOTORISTA**
4398: openDriverFile()
4428: closeDriverFile()
4430: saveDriverFile()
4486: aiFillDriver()
4525: **CONTROLE FINANCEIRO**
4526: finRange()
4543: dayBR()
4544: inRange()
4546: onFinPeriodChange()
4552: fillFinFilters()
4560: clearFinFilters()
4564: updateFinFilterCount()
4573: openFinance()
4579: switchFinTab()
4590: finCardBtn()
4598: closeFinCardDetail()
4599: closeFinance()
4601: collectRentFinData()
4652: renderFinance()
4710: openFinCardDetail()
4917: openFinExtrato()
5011: renderFinExtratoView()
5092: openFinExtratoReport()
5109: renderFinGrafico()
5129: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
5131: okEmail()
5133: openEmailCompose()
5154: closeEmailCompose()
5155: sendEmailCompose()
5170: emailRecibo()
5175: emailIA()
5183: **RELATÓRIO DO FINANCEIRO**
5185: finFiltersText()
5190: finPeriodText()
5197: buildReportHtml()
5219: openFinReport()
5229: closeFinReport()
5230: printFinReport()
5234: shareFinReport()
5244: emailFinReport()
5250: **DESPESAS DO VEÍCULO**
5252: openExpenses()
5264: closeExpenses()
5265: fillExpenseTypes()
5270: createExpenseType()
5285: aiReadExpense()
5317: renderExpenses()
5339: saveExpense()
5366: deleteExpense()
5391: photoCard()
5420: inspectionHtml()
5446: hydrateImages()
5452: openInspection()
5460: closeInspection()
5464: renderInspectionModal()
5471: uploadInspection()
5502: deleteInspectionPhoto()
5522: fmtDue()
5528: nextDueLocal()
5539: openNewPix()
5569: **CAUÇÃO DO MOTORISTA**
5570: cauOf()
5571: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
5572: devOf()
5573: devCobrancas()
5575: devPrevisao()
5583: dfDevRender()
5610: dfDevIr()
5611: dfDevSalvar()
5616: dfDevAvisar()
5622: dfDevDesfazer()
5626: dfDevReceber()
5635: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
5639: cauPlano()
5647: cauParcela()
5654: cauParcelasTexto()
5658: cauNext()
5665: dfCauFill()
5675: dfCauCalc()
5703: dfCauRead()
5716: expTypeName()
5720: driverFinVehicleId()
5732: cauEntradaItem()
5746: cauPagoDespesaItem()
5761: **CAUÇÃO: quanto já foi pago**
5763: cauStatus()
5773: obsResumoHtml()
5774: cauResumoHtml()
5779: **MULTAS E OUTRAS DESPESAS**
5780: multasOf()
5782: multaPagaAuto()
5787: multasAbertas()
5788: multasPendentes()
5789: multasResumoHtml()
5797: cobOf()
5798: dfCobFill()
5804: dfCobRead()
5807: dfCobInfo()
5817: cobResumoHtml()
5821: ajustesOf()
5825: ajusteVale()
5826: isoDia()
5828: vencProxima()
5829: previsaoProxima()
5843: previsaoHtml()
5847: dfAjRender()
5853: addAjuste()
5862: delAjuste()
5867: abrirAjustes()
5868: renderProxCobrancas()
5874: savePixExtra()
5882: dfMultFill()
5890: fdPaga()
5891: dfMultRender()
5900: toggleMultas()
5907: addMulta()
5917: delMulta()
5925: multaPaga()
5934: renderDriverExtras()
5962: mondayAfter()
5970: renderDriverProfileExtras()
6036: semanaDoPix()
6042: **MEUS RECIBOS (área do motorista)**
6044: meusRecibosLista()
6048: reciboRowHtml()
6056: renderEncerradoRecibos()
6061: openMeuReciboDireto()
6062: openMeusRecibos()
6069: closeMeusRecibos()
6070: reciboPdfHtml()
6081: verMeuRecibo()
6088: voltarMeusRecibos()
6089: pdfMeuRecibo()
6093: shareMeuRecibo()
6102: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
6103: editVehicleRent()
6120: nextParcel()
6126: fillNewPixValues()
6162: newPixParts()
6193: **PERÍODO E VENCIMENTO DA COBRANÇA**
6194: dataISO()
6195: dataDe()
6196: dataMais()
6197: dataBR()
6198: diasEntre()
6199: isoSP()
6200: pixPeriodo()
6207: pixDesc()
6208: pixDiasPeriodo()
6213: marcarAjustesPorVenc()
6218: pixDatasNovo()
6227: pixDatasMudou()
6238: pixAluguelProporcional()
6246: pixPeriodoInfo()
6259: pixAddLinha()
6266: pixLinhas()
6268: descSoma()
6278: calcNewPix()
6287: **RECIBO DE PAGAMENTO**
6291: receiptValue()
6292: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
6293: atrasoDados()
6300: cobrarAtraso()
6316: allocatePix()
6335: reciboData()
6358: fmtDateTimeBR()
6359: reciboTexto()
6410: openRecibo()
6427: closeRecibo()
6428: **CORRIGIR RECIBO**
6430: corrigirLinhaHtml()
6440: openCorrigirRecibo()
6463: closeCorrigirRecibo()
6464: corrigirLer()
6470: corrigirSoma()
6477: salvarCorrigirRecibo()
6494: copyRecibo()
6499: reciboCanvas()
6516: reciboPdfBlob()
6534: shareReciboPdf()
6550: rotularTabelas()
6568: areaAberta()
6569: markAreas()
6579: closeAreas()
6583: toggleArea()
6591: dobraSalva()
6592: setDobra()
6597: toggleDobra()
6604: dobraTopo()
6611: renderMasterResumo()
6625: renderMasterTopo()
6647: loadIA()
6669: updateIABadge()
6674: loadIASetting()
6680: paintIASwitch()
6686: toggleIA()
6693: loadRobo()
6702: iaPrepararQr()
6707: paintRobo()
6736: pedirCodigoRobo()
6745: toggleRobo()
6760: iaTodosGerar()
6778: iaTodosCancelar()
6782: iaTodosConfirmar()
6796: loadIARules()
6801: iaAbrirPdf()
6807: renderIARules()
6811: saveIARules()
6816: addIARule()
6821: delIARule()
6825: openIA()
6840: closeIA()
6841: iaShow()
6842: iaPhone()
6847: renderIA()
6889: iaAprovar()
6898: iaPhone2()
6899: iaSend()
6930: iaMark()
6941: iaDelete()
6952: openPixArea()
6961: closePixArea()
6962: renderPixArea()
6998: openEditPix()
7027: deletePix()
7039: closeNewPix()
7041: saveNewPix()
7132: pushSupported()
7133: isIOS()
7134: isStandalone()
7135: b64ToBytes()
7141: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
7146: notifStatus()
7154: stepsList()
7158: notifHelpHtml()
7192: renderNotifModal()
7204: checkDriverNotifications()
7237: activateFromModal()
7250: refreshNotifButton()
7269: subscribePush()
7284: enableNotifications()
7304: closeDocViewer()
7312: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
7324: allFeaturesOn()
7325: feat()
7326: loadDriverFeatures()
7333: saveDriverFeatures()
7337: drawFeatureToggles()
7352: setAllFeatures()
7363: applyDriverFeatures()
7378: **PIX: conferência do código e QR code desenhado no aparelho**
7379: crc16()
7387: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
7389: pixTxt()
7390: pixCampo()
7391: pixGerarCodigo()
7401: pixAutoLigado()
7402: pixAutoMudou()
7407: gerarPixAuto()
7423: pixRecebedorCarregar()
7434: pixRecebedorGuardar()
7441: pixValid()
7447: renderPixQr()
7457: previewNewPixQr()
7467: **FOTO DO MOTORISTA (recortada da CNH)**
7468: photoPath()
7469: fileToCanvas()
7488: cropPhoto()
7502: savePhoto()
7507: photoBoxFrom()
7513: fillAvatar()
7524: fillAvatars()
7537: storedFile()
7544: photoFromCnh()
7556: **FOTO DO PERFIL ACOMPANHA A CNH**
7559: cnhStamp()
7560: photoFiles()
7568: avatarPath()
7573: syncCnhPhotos()
7597: pickImage()
7600: changeDriverPhoto()
7616: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
7618: uploadTmp()
7625: clearTmp()
7630: aiReadFiles()
7636: okDateISO()
7638: noAccents()
7640: makeUsername()
7649: titleCase()
7650: syncNewDriverAccess()
7656: setNewDriverPhoto()
7661: pickNewDriverPhoto()
7665: resetNewDriverForm()
7673: newDriverDocChosen()
7707: anoCrlv()
7708: aiReadCrlv()
7725: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
7726: sendWelcomeEmail()
7732: showCredentials()
7743: demoAssistente()
7762: **PERGUNTAR À IA (ÁREA IA, só o master)**
7766: iaChatReset()
7767: iaNorm()
7768: iaAcha()
7774: iaVeicTxt()
7775: iaCamposVeic()
7776: iaDataOk()
7777: iaOpcoes()
7778: iaTodosMotoristas()
7782: iaFerramenta()
7877: renderIAChat()
7894: iaChatDica()
7895: iaChatEnviar()
7930: iaChatNota()
7931: iaCancelarCartao()
7932: iaConfirmarCartao()
7977: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
7978: syncAppFinState()
7987: renderAppEarnings()
8067: saveAppEarning()
8094: workDayISO()
8095: paintDayOff()
8104: renderDayOff()
8111: setDayOff()
8121: aiReadEarning()
8154: **DESPESAS DO APLICATIVO**
8156: appExpCustomTypes()
8157: fillAppExpTypes()
8164: onAppExpTypeChange()
8169: saveAppExpense()
8194: deleteAppExpense()
8203: deleteAppEarning()
8300: loadTermsAcceptances()
8312: termsOf()
8313: currentAcceptance()
8314: needsTermsAcceptance()
8317: fmtDateTime()
8320: termsPlainText()
8324: termsHash()
8332: openTermsGate()
8355: termsGateCheck()
8363: acceptTerms()
8383: acceptanceHtml()
8394: openTermsViewer()
8412: closeTerms()
8418: downloadTermsCopy()
8439: termsBadgeMaster()
8446: termsMasterDetail()
8487: renderTermsSetupBanner()
8500: copyTermsSql()
8510: cnhExpired()
8511: cnhWaiting()
8512: onlyDigits()
8513: normName()
8515: verifyCnh()
8527: renderCnhBanner()
8545: sendNewCnh()
8593: cnhBadgeMaster()
8601: applyPendingCnh()
8609: autoReadNewCnhs()
8627: cnhPendingHtml()
8641: recheckPendingCnh()
8651: rejectPendingCnh()
8661: showContractDoc()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (518 linhas)

22: serviceKey()
29: json()
31: brl()
34: secret()
39: asaas()
52: avisar()
62: hojeBR()
63: proximoDia()
70: proximaParcela()
81: cauParcela()
90: ajusteVale()
93: tirarAjustes()
99: cobrarMotorista()
112: *valores (mesma regra do Novo Pix)*
140: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
143: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
164: r2()
166: criarQrAsaasEUpload()
189: saldoAbertoMotorista()
228: salvarQrParcialNoPerfil()
239: cobrarTodos()
259: *pagamento recebido*
260: quemPagou()
283: pagamentoRecebido()
349: usuarioAuth()
358: ehMaster()
363: pixParcialMotorista()
422: autorizarParcial()
463: preparar()
464: limpa()
499: acao "pix_parcial"
502: acao "autorizar_parcial"
507: acao "preparar"
511: acao "cobrar"

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (310 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
122: emAberto()
134: avisoAtraso()
152: **4) PIX AUTOMÁTICO DO MOTORA**
154: crc16()
159: campo()
160: txtPix()
161: codigoPix()
168: chaveNormal()
175: proximaParcela()
183: pixAutomatico()
190: *valores (mesma regra do Novo Pix e do Asaas)*
217: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
238: pixAutoTodos()
262: enviar()
271: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (442 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
