# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 16:21:11. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (7697 linhas)

16: <!-- Tailwind CSS CDN -->
36: <!-- Font Awesome Icons -->
38: <!-- PDF.js para renderizar PDFs -->
40: <!-- Gera o QR code do Pix a partir do copia e cola -->
42: <!-- Supabase (banco de dados online) -->
158: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
163: <!-- Header Principal -->
177: <!-- Controles do Header -->
179: <!-- Botão Status Online/Offline (Motorista) -->
187: <!-- Ativar Notificações -->
192: <!-- Temas -->
197: <!-- Logout Button -->
206: <!-- Conteúdo Principal -->
209: <!-- TELA DE LOGIN -->
210: #secLogin
243: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
244: #secDemoEscolha
259: <!-- PAINEL DO MOTORISTA -->
260: #secDriverPanel
262: <!-- Card do Veículo Vinculado -->
276: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
286: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
291: <!-- Aviso: nova versão do app Android -->
294: <!-- Aviso vermelho: notificações desligadas -->
297: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
301: <!-- Aviso de Pix / pagamento pendente -->
304: <!-- Navegação de Abas -->
322: <!-- Conteúdo das Abas Motorista -->
325: <!-- Aba CRLV-e -->
326: #tabDrvCrlv
331: <!-- Renderizado dinamicamente -->
335: <!-- Aba Contrato -->
336: #tabDrvContract
346: <!-- Renderizado dinamicamente -->
350: <!-- Aba Vistoria -->
351: #tabDrvInspection
358: <!-- Aba Pagamento -->
359: #tabDrvPayment
372: <!-- Caução e multas do motorista -->
374: <!-- Valor e descrição da cobrança -->
384: <!-- Seção Pix -->
398: <!-- QR Code Renderizado aqui -->
431: <!-- Seção Upload de Comprovante -->
448: <!-- Lista de comprovantes -->
458: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
459: #secMasterPanel
493: <!-- Aviso: falta criar a tabela dos termos no banco -->
496: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
498: <!-- Lista de Veículos -->
514: <!-- Renderizado via JS -->
521: <!-- Form de Adicionar Veículo -->
555: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
561: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
566: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
571: <!-- Fichas Arquivadas (após marcar caução pago) -->
580: <!-- Form de Adicionar Motorista -->
675: <!-- Barra de baixo do dono (só no design novo) -->
685: <!-- MODAL PRIMEIRO LOGIN -->
686: #modalFirstLogin
720: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
721: #modalNotif
734: <!-- MODAL VISTORIA (MASTER) -->
735: #modalInspection
748: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
749: #modalSettings
808: <!-- MODAL TEMAS -->
809: #modalThemes
820: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
821: #modalCreds
836: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
851: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
852: #modalDriverFile
892: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
921: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
936: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
978: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
979: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
980: #modalRecibo
999: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1000: #modalPixArea
1016: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1017: #modalIA
1099: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1100: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1101: #modalEditVeh
1120: #modalSenha
1142: #modalMeusRecibos
1160: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1161: #modalEmail
1181: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1182: #modalReport
1197: #modalFinance
1250: <!-- FILTROS -->
1299: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1319: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1320: #modalExpenses
1355: <!-- MODAL NOVO PIX -->
1356: #modalNewPix
1408: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1466: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1467: #modalCorrigirRecibo
1481: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1482: #modalDocViewer
1490: #modalDocBody
1491: <!-- Conteúdo pré-visualizado -->
1497: #modalTerms
1511: <!-- NOTIFICAÇÕES TOAST -->
1528: lsGet()
1529: lsSet()
1530: lsDel()
1553: demoLoginRole()
1557: demoId()
1558: demoSave()
1559: demoSaved()
1561: *datas no horário de Brasília*
1562: demoLocal()
1563: demoParts()
1564: demoDay()
1565: demoNextDue()
1570: *dados fictícios (4 meses)*
1571: demoBuild()
1714: *documentos fictícios (imagem gerada na hora)*
1715: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1716: demoDocBlob()
1794: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1795: demoQuery()
1818: out()
1824: run()
1865: demoOnUpdate()
1875: demoOnInsert()
1974: demoClient()
2039: demoStart()
2047: demoStop()
2053: abrirDemo()
2060: trocarDemo()
2065: demoBanner()
2080: toEmail()
2084: showLogin()
2088: esc()
2093: dataHoraBR()
2101: uiDialogo()
2149: uiConfirm()
2158: uiPrompt()
2164: friendlyError()
2174: devicePrefs()
2177: saveDevicePrefs()
2180: docRef()
2181: viewDocIdx()
2183: setBusy()
2221: **TEMAS**
2230: currentTheme()
2235: applyTheme()
2236: openThemes()
2246: pickTheme()
2252: toggleDarkMode()
2254: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2256: loadDesignCfg()
2263: applyDesign()
2280: markMasterNav()
2285: fillDesignCfg()
2290: saveDesign()
2304: showToast()
2313: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2314: senhaErro()
2315: abrirSenha()
2324: salvarIaCodigo()
2334: fecharSenha()
2335: salvarSenha()
2356: loginUserInput()
2361: loginErro()
2365: verSenha()
2370: handleLogin()
2419: logout()
2438: saveFirstLoginPreferences()
2461: carregarDados()
2484: aplicarDados()
2507: loadAndRender()
2534: autoRefresh()
2573: markUpdated()
2578: reload()
2583: renderApp()
2631: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2634: masterBack()
2636: viewAsDriver()
2658: exitViewAs()
2677: viewOnly()
2678: renderViewAsBanner()
2688: showSection()
2694: toggleDriverStatus()
2703: isOnline()
2705: updateStatusToggleUI()
2718: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2727: checkApkUpdate()
2742: updateInstallApkButton()
2762: renderDriverPanel()
2970: switchDriverTab()
2985: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
2988: parsePixKey()
2992: normalizePixKey()
3000: pixKeyLooksOk()
3008: togglePixKeyFields()
3014: updatePixKeyPlaceholder()
3020: copyPixKey()
3027: copyPixCode()
3039: receiptBadge()
3049: receiptMasterBox()
3076: receiptAction()
3083: confirmReceipt()
3096: rejectReceipt()
3108: recheckReceipt()
3117: uploadReceipt()
3140: switchMasterTab()
3157: maskPhone()
3166: waLink()
3171: allVeh()
3172: allDrv()
3173: chargeVehicleId()
3185: enviarPedidoParcialAsaas()
3201: pedirPixParcial()
3219: restaurarPixTotal()
3225: responderPixParcial()
3249: contrato30Info()
3267: encerrarContrato()
3283: encerrarContratoPrompt()
3296: reativarContrato()
3310: marcarCaucaoPagoArquivar()
3329: desarquivarFicha()
3346: dfContratoRender()
3387: encerrarContratoConfirmFicha()
3394: renderMasterPanel()
3537: renderArchivedDrivers()
3582: handleAddVehicle()
3615: deleteVehicle()
3616: cancelDeleteVehicle()
3618: confirmDeleteVehicle()
3636: abrirEditarVeiculo()
3655: fecharEditarVeiculo()
3656: salvarEditarVeiculo()
3686: drvCauMostra()
3693: drvCauLer()
3701: handleAddDriver()
3779: marcarSituacao()
3787: updateDriverPaymentStatus()
3796: deleteDriver()
3797: cancelDeleteDriver()
3799: confirmDeleteDriver()
3816: prepareFile()
3838: uploadFile()
3849: fileUrl()
3860: downloadName()
3864: renderFilePreview()
3884: renderPdfToCanvas()
3911: viewDoc()
3932: **DINHEIRO**
3933: parseMoney()
3940: fmtMoney()
3941: fmtDate()
3942: todayISO()
3944: **CONFIGURAÇÕES (Gemini e Google Drive)**
3946: loadConfigStatus()
3951: paintConfig()
3956: openSettings()
3966: closeSettings()
3967: saveConfig()
3977: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
3978: loadAsaasInfo()
3991: saveAsaas()
3999: testarAsaas()
4006: copiarAsaas()
4010: testDrive()
4017: resyncDrive()
4025: **FICHA DO MOTORISTA**
4028: openDriverFile()
4058: closeDriverFile()
4060: saveDriverFile()
4110: aiFillDriver()
4149: **CONTROLE FINANCEIRO**
4150: finRange()
4167: dayBR()
4168: inRange()
4170: onFinPeriodChange()
4176: fillFinFilters()
4184: clearFinFilters()
4188: updateFinFilterCount()
4197: openFinance()
4202: switchFinTab()
4212: closeFinance()
4214: renderFinance()
4292: renderFinGrafico()
4312: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
4314: okEmail()
4316: openEmailCompose()
4337: closeEmailCompose()
4338: sendEmailCompose()
4353: emailRecibo()
4358: emailIA()
4366: **RELATÓRIO DO FINANCEIRO**
4368: finFiltersText()
4373: finPeriodText()
4380: buildReportHtml()
4402: openFinReport()
4412: closeFinReport()
4413: printFinReport()
4417: shareFinReport()
4427: emailFinReport()
4433: **DESPESAS DO VEÍCULO**
4435: openExpenses()
4447: closeExpenses()
4448: fillExpenseTypes()
4453: createExpenseType()
4468: aiReadExpense()
4500: renderExpenses()
4522: saveExpense()
4549: deleteExpense()
4570: photoCard()
4599: inspectionHtml()
4625: hydrateImages()
4631: openInspection()
4639: closeInspection()
4643: renderInspectionModal()
4650: uploadInspection()
4681: deleteInspectionPhoto()
4697: fmtDue()
4703: nextDueLocal()
4714: openNewPix()
4744: **CAUÇÃO DO MOTORISTA**
4745: cauOf()
4746: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
4747: devOf()
4748: devCobrancas()
4750: devPrevisao()
4758: dfDevRender()
4785: dfDevIr()
4786: dfDevSalvar()
4791: dfDevAvisar()
4797: dfDevDesfazer()
4801: dfDevReceber()
4810: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
4814: cauPlano()
4822: cauParcela()
4829: cauParcelasTexto()
4833: cauNext()
4840: dfCauFill()
4850: dfCauCalc()
4878: dfCauRead()
4891: **CAUÇÃO: quanto já foi pago**
4893: cauStatus()
4903: obsResumoHtml()
4904: cauResumoHtml()
4909: **MULTAS E OUTRAS DESPESAS**
4910: multasOf()
4912: multaPagaAuto()
4917: multasAbertas()
4918: multasPendentes()
4919: multasResumoHtml()
4927: cobOf()
4928: dfCobFill()
4934: dfCobRead()
4937: dfCobInfo()
4947: cobResumoHtml()
4951: ajustesOf()
4955: ajusteVale()
4956: isoDia()
4958: vencProxima()
4959: previsaoProxima()
4973: previsaoHtml()
4977: dfAjRender()
4983: addAjuste()
4990: delAjuste()
4993: abrirAjustes()
4994: renderProxCobrancas()
5000: savePixExtra()
5008: dfMultFill()
5016: fdPaga()
5017: dfMultRender()
5026: toggleMultas()
5033: addMulta()
5041: delMulta()
5046: multaPaga()
5052: renderDriverExtras()
5079: mondayAfter()
5087: renderDriverProfileExtras()
5142: semanaDoPix()
5148: **MEUS RECIBOS (área do motorista)**
5150: meusRecibosLista()
5154: openMeusRecibos()
5168: closeMeusRecibos()
5169: reciboPdfHtml()
5180: verMeuRecibo()
5187: voltarMeusRecibos()
5188: pdfMeuRecibo()
5192: shareMeuRecibo()
5199: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
5200: editVehicleRent()
5212: nextParcel()
5218: fillNewPixValues()
5254: newPixParts()
5285: **PERÍODO E VENCIMENTO DA COBRANÇA**
5286: dataISO()
5287: dataDe()
5288: dataMais()
5289: dataBR()
5290: diasEntre()
5291: isoSP()
5292: pixPeriodo()
5299: pixDesc()
5300: pixDiasPeriodo()
5305: marcarAjustesPorVenc()
5310: pixDatasNovo()
5319: pixDatasMudou()
5330: pixAluguelProporcional()
5338: pixPeriodoInfo()
5351: pixAddLinha()
5358: pixLinhas()
5360: descSoma()
5370: calcNewPix()
5379: **RECIBO DE PAGAMENTO**
5383: receiptValue()
5384: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
5385: atrasoDados()
5392: cobrarAtraso()
5408: allocatePix()
5427: reciboData()
5450: fmtDateTimeBR()
5451: reciboTexto()
5502: openRecibo()
5519: closeRecibo()
5520: **CORRIGIR RECIBO**
5522: corrigirLinhaHtml()
5532: openCorrigirRecibo()
5555: closeCorrigirRecibo()
5556: corrigirLer()
5562: corrigirSoma()
5569: salvarCorrigirRecibo()
5586: copyRecibo()
5591: reciboCanvas()
5608: reciboPdfBlob()
5626: shareReciboPdf()
5640: rotularTabelas()
5658: areaAberta()
5659: markAreas()
5662: closeAreas()
5666: toggleArea()
5676: dobraSalva()
5677: setDobra()
5682: toggleDobra()
5689: dobraTopo()
5696: renderMasterResumo()
5710: renderMasterTopo()
5732: loadIA()
5754: updateIABadge()
5759: loadIASetting()
5765: paintIASwitch()
5771: toggleIA()
5778: loadRobo()
5787: iaPrepararQr()
5792: paintRobo()
5821: pedirCodigoRobo()
5830: toggleRobo()
5842: iaTodosGerar()
5860: iaTodosCancelar()
5864: iaTodosConfirmar()
5878: loadIARules()
5883: iaAbrirPdf()
5889: renderIARules()
5893: saveIARules()
5898: addIARule()
5903: delIARule()
5907: openIA()
5922: closeIA()
5923: iaShow()
5924: iaPhone()
5929: renderIA()
5971: iaAprovar()
5980: iaPhone2()
5981: iaSend()
6012: iaMark()
6021: iaDelete()
6030: openPixArea()
6039: closePixArea()
6040: renderPixArea()
6076: openEditPix()
6105: deletePix()
6117: closeNewPix()
6119: saveNewPix()
6210: pushSupported()
6211: isIOS()
6212: isStandalone()
6213: b64ToBytes()
6219: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
6224: notifStatus()
6232: stepsList()
6236: notifHelpHtml()
6270: renderNotifModal()
6282: checkDriverNotifications()
6313: activateFromModal()
6324: refreshNotifButton()
6343: subscribePush()
6358: enableNotifications()
6376: closeDocViewer()
6384: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
6396: allFeaturesOn()
6397: feat()
6398: loadDriverFeatures()
6405: saveDriverFeatures()
6409: drawFeatureToggles()
6424: setAllFeatures()
6429: applyDriverFeatures()
6443: **PIX: conferência do código e QR code desenhado no aparelho**
6444: crc16()
6452: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
6454: pixTxt()
6455: pixCampo()
6456: pixGerarCodigo()
6466: pixAutoLigado()
6467: pixAutoMudou()
6472: gerarPixAuto()
6488: pixRecebedorCarregar()
6499: pixRecebedorGuardar()
6506: pixValid()
6512: renderPixQr()
6522: previewNewPixQr()
6532: **FOTO DO MOTORISTA (recortada da CNH)**
6533: photoPath()
6534: fileToCanvas()
6553: cropPhoto()
6567: savePhoto()
6572: photoBoxFrom()
6578: fillAvatar()
6589: fillAvatars()
6602: storedFile()
6609: photoFromCnh()
6621: **FOTO DO PERFIL ACOMPANHA A CNH**
6624: cnhStamp()
6625: photoFiles()
6633: avatarPath()
6638: syncCnhPhotos()
6662: pickImage()
6665: changeDriverPhoto()
6681: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
6683: uploadTmp()
6690: clearTmp()
6695: aiReadFiles()
6701: okDateISO()
6703: noAccents()
6705: makeUsername()
6714: titleCase()
6715: syncNewDriverAccess()
6721: setNewDriverPhoto()
6726: pickNewDriverPhoto()
6730: resetNewDriverForm()
6738: newDriverDocChosen()
6772: anoCrlv()
6773: aiReadCrlv()
6790: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
6791: sendWelcomeEmail()
6797: showCredentials()
6808: demoAssistente()
6827: **PERGUNTAR À IA (ÁREA IA, só o master)**
6831: iaChatReset()
6832: iaNorm()
6833: iaAcha()
6839: iaVeicTxt()
6840: iaCamposVeic()
6841: iaDataOk()
6842: iaOpcoes()
6843: iaTodosMotoristas()
6847: iaFerramenta()
6936: renderIAChat()
6953: iaChatDica()
6954: iaChatEnviar()
6989: iaChatNota()
6990: iaCancelarCartao()
6991: iaConfirmarCartao()
7034: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
7035: renderAppEarnings()
7097: saveAppEarning()
7122: workDayISO()
7123: renderDayOff()
7134: setDayOff()
7144: aiReadEarning()
7177: **DESPESAS DO APLICATIVO**
7179: appExpCustomTypes()
7180: fillAppExpTypes()
7187: onAppExpTypeChange()
7192: saveAppExpense()
7216: deleteAppExpense()
7223: deleteAppEarning()
7318: loadTermsAcceptances()
7330: termsOf()
7331: currentAcceptance()
7332: needsTermsAcceptance()
7335: fmtDateTime()
7338: termsPlainText()
7342: termsHash()
7350: openTermsGate()
7373: termsGateCheck()
7381: acceptTerms()
7401: acceptanceHtml()
7412: openTermsViewer()
7430: closeTerms()
7436: downloadTermsCopy()
7457: termsBadgeMaster()
7464: termsMasterDetail()
7505: renderTermsSetupBanner()
7518: copyTermsSql()
7528: cnhExpired()
7529: cnhWaiting()
7530: onlyDigits()
7531: normName()
7533: verifyCnh()
7545: renderCnhBanner()
7563: sendNewCnh()
7611: cnhBadgeMaster()
7619: applyPendingCnh()
7627: autoReadNewCnhs()
7645: cnhPendingHtml()
7659: recheckPendingCnh()
7669: rejectPendingCnh()
7679: showContractDoc()

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
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
